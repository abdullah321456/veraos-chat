import Link from "next/link";

type Article = {
  id: number;
  title: string;
  link: string;
};

const articles: Article[] = [
  { id: 1, title: "Best Practices for Dossier Collaboration", link: "#" },
  { id: 2, title: "Tracking Changes with Version Control", link: "#" },
  { id: 3, title: "Understanding Geospatial Trace Insights", link: "#" },
  { id: 4, title: "How to Translate Information Seamlessly", link: "#" },
  { id: 5, title: "Managing High-Risk Indicators on the Map", link: "#" },
];
export function PopularArticles() {
  return (
    <>
      <h1 className="text-black text-base font-bold mb-4">Popular Articles</h1>
      <ul className="space-y-3">
        {articles.map((article) => (
          <li key={article.id}>
            <Link
              href={article.link}
              className="underline font-normal text-sm text-black hover:text-primary">
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
