import { Helmet } from "react-helmet-async";

function Seo({ title }: { title: string }) {
  return (
    <Helmet>
      <title>Movieflix | {title}</title>
    </Helmet>
  );
}

export default Seo;
