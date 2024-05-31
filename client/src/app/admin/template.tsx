import Link from "next/link"
export default function Template({children}:{children:React.ReactNode}) {
  const LinkClass = "p-2 px-4 font-semibold "
  return (<>
    <div className="flex">
      <div className="w-max flex flex-col gap-y-2 px-2 py-4 ">
        <Link href={"/admin/movie-list"} className={LinkClass}>Movie List</Link>
        <Link href={"/admin/movie-license"} className={LinkClass}>Get License</Link>
      </div>
      <div className="w-full">{children}</div>
    </div>
</>)
}
