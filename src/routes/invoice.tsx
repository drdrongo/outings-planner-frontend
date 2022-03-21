import { useParams, useNavigate } from "react-router-dom";
import { getInvoice, deleteInvoice } from "../data/dummy";

interface Invoice {
  name: string;
  number: number;
  amount: string;
  due: string
}

export default function Invoice() {
  let navigate = useNavigate();
  let params: any = useParams();
  let invoice: Invoice | undefined = getInvoice(parseInt(params.invoiceId, 10));

  if (!invoice) {
    return (
      <main style={{ padding: "1rem" }}>
        <h2>Nothing here</h2>
      </main>
    ) 
  }

  return (
    <main style={{ padding: "1rem" }}>
      <h2>Total Due: {invoice.amount}</h2>
      <p>
        {invoice.name}: {invoice.number}
      </p>
      <p>Due Date: {invoice.due}</p>
      <p>
        <button
          onClick={() => {
            if (!invoice) return;

            deleteInvoice(invoice.number);
            navigate("/invoices");
          }}
        >
          Delete
        </button>
      </p>
    </main>
  );
}
