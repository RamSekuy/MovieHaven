import mainAPI from "@/app/_lib/mainApi";
import ChangeStatus from "@/app/_components/transactionComponent/changeStatus";
import { ITransaction } from "@/app/_model/transaction.model";
import ErrorPage from "@/app/_components/errorPage/errorPage";
import { isNumberObject } from "util/types";
import { AxiosError } from "axios";
import SSRApi from "@/app/_lib/testApi";
type Props = {
  params: {
    invoiceNum: string;
  };
};

export default async function checkOutPage({ params }: Props) {
  const fetchTrans = async () => {
    return await SSRApi()
      .get(`/transaction/invoice/${params.invoiceNum}`)
      .then((res) => res.data.data as ITransaction)
      .catch((err: any) => {
        if (err instanceof AxiosError) console.log(err.response?.data);
        return err.response.status as number;
      });
  };
  const result = await fetchTrans();
  console.log(result, "ini result");

  if (isNumberObject(result)) return <ErrorPage code={result} />;
  // else
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 flex justify-center bg-gray-50">
        <div className="max-w-md w-full border border-gray-200 rounded-lg shadow p-6 bg-white">
          <h1 className="text-2xl font-bold mb-4">Detail Transaksi</h1>
          <div>
            <div className="border border-gray-200 rounded p-4 mb-4">
              <div className="flex mb-2 flex-col">
                <span className="font-bold">Date:</span>
                <span>{new Date(result.date).toLocaleDateString("id-ID")}</span>
              </div>
              <div className="flex flex-col mb-2">
                <span className="font-bold">Invoice Number:</span>
                <span>{result.invoiceNum}</span>
              </div>
              <div className="flex mb-2 flex-col">
                <span className="font-bold">Type:</span>
                <span>{result.type}</span>
              </div>
              <div className="flex mb-2 flex-col">
                <span className="font-bold">Status:</span>
                <span
                  className={
                    !result.isPaid
                      ? "text-yellow-500 font-bold"
                      : "text-green-500 font-bold"
                  }
                >
                  {!result.isPaid ? "Payment Processing" : "Payment Successful"}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="font-bold">
              Total:
              {result.total.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <ChangeStatus transactionId={result.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
