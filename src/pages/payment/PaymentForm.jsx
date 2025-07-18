import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import UseAxios from "../../hooks/UseAxios";
import { AuthContext } from "../../context/authcontext/AuthContext";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const { user } = useContext(AuthContext); // ✅ Corrected `use(AuthContext)` → `useContext`
  const stripe = useStripe();
  const elements = useElements();
  const [err, setErr] = useState("");
  const { id: classId } = useParams(); // ✅ Use `id` instead of `classId` from route param
  const axiosSecure = UseAxios();
  const navigate = useNavigate();

  // ✅ Get class data
  const { data: classInfo = {} } = useQuery({
    queryKey: ["class", classId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/class/${classId}`);
      return res.data;
    },
    enabled: !!classId,
  });
  console.log(classInfo);

  const amount = classInfo?.price || 0;
  const amountInCents = parseInt(amount * 100);
  // console.log(amountInCents);

  // ✅ Check if user is already enrolled
  const { data: isAlreadyEnrolled = false, isLoading } = useQuery({
    queryKey: ["isEnrolled", classId, user?.email],
    enabled: !!classId && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/enrolled/check?classId=${classId}&email=${user.email}`
      );
      return res.data?.enrolled || false;
    },
  });

  // hwre the stripe payment logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErr(error.message);
      return;
    } else {
      setErr("");
    }

    // ✅ Create Payment Intent
    const { data } = await axiosSecure.post("/create-payment-intent", {
      amount: amountInCents,
    });

    const clientSecret = data.clientSecret;

    // ✅ Confirm Payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    });

    if (result.error) {
      setErr(result.error.message);
    } else {
      setErr("");
      if (result.paymentIntent.status === "succeeded") {
        const transactionId = result.paymentIntent.id;

        console.log("payment history");

        // ✅ Store payment + enrollment info
        const paymentData = {
          classId,
          email: user?.email,
          name: user?.displayName,
          title: classInfo.title,
          image: classInfo.image,
          instructorName: classInfo.instructorName,
          transactionId,
          amount,
          paymentMethod: result.paymentIntent.payment_method_types[0],
          paymentDate: new Date().toISOString(),
        };

        const res = await axiosSecure.post("/enroll", paymentData);
        if (res.data.insertedId) {
          await Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
            confirmButtonText: "Go to My Enrolled Classes",
          });

          // ✅ Navigate to enrolled classes
          navigate("/dashboard/my-enroll-classes");
        }
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto p-4 sm:p-6 bg-white shadow-xl rounded-2xl border border-gray-200 space-y-6 mt-4"
    >
      <CardElement
        className="w-full px-3 py-3 border rounded-md bg-white focus:outline-none"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />

      <button
        type="submit"
        disabled={!stripe || isLoading || isAlreadyEnrolled}
        className="w-full py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isAlreadyEnrolled ? "Already Enrolled" : `Pay $${amount}`}
      </button>

      {err && <p className="text-red-600">{err}</p>}
    </form>
  );
};

export default PaymentForm;
