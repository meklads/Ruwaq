import { redirect } from "next/navigation";

/** Legacy URL — tool lives on the home page. */
export default function NewProposalRedirectPage() {
  redirect("/");
}
