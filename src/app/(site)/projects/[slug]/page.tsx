import { redirect } from "next/navigation";

type Props = { params: { slug: string } };

export default function ProjectSlugRedirect({ params }: Props) {
  redirect(`/tours/${params.slug}`);
}
