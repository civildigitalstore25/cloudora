import { CANCELLATION_POLICY } from "@/constants/booking";

export default function RefundPage() {
  return (
    <div className="bg-background px-4 py-16 md:px-6 md:py-24">
      <div className="prose prose-neutral mx-auto max-w-3xl">
        <h1>Refund policy</h1>
        <p>Reservations are guaranteed with an advance payment of 50%.</p>
        <ul>
          {CANCELLATION_POLICY.map((item) => (
            <li key={item.title}>
              <strong>{item.title}:</strong> {item.body}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
