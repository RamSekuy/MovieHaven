import mainAPI from "@/app/_lib/mainApi";
import DateInvoice from "@/app/_components/invoiceComponent/dateInvoice"
type Props = {
  params: {
    invoiceNum: string;
  };
};

export default async function checkOutPage({ params }: Props) {
  const result = (
    await mainAPI.get(`/transaction/invoice/${params.invoiceNum}`)
  ).data.data;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <div>
        <div className="border border-gray-200 rounded p-4 mb-4">
          <DateInvoice date={result.date}/>
          <p>Invoice Number: {result.invoiceNum}</p>
          <p>Type: {result.type}</p>
          {/* Tambahkan detail transaksi lainnya sesuai kebutuhan */}
         
        </div>
      </div>
      <div className="mt-4">
        <p className="font-bold">Total: {result.total.toLocaleString("id-ID", { style: "currency", currency: "IDR"})}</p>
      </div>
    </div>
  );
}
