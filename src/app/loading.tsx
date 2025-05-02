import Spinner from "@/lib/components/Spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center py-12">
      <Spinner color="primary" />
    </div>
  )
}