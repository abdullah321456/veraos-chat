'use client';

import Link from "next/link";
import { useDarkMode } from "@/lib/contexts/dark-mode-context";

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
  const { isDarkMode } = useDarkMode();
  
  const headingColor = isDarkMode ? '#FFFFFF' : '#000000';
  const linkColor = isDarkMode ? '#FFFFFF' : '#000000';

  return (
    <>
      <h1 
        className="text-base font-bold mb-4"
        style={{ color: headingColor }}
      >
        Popular Articles
      </h1>
      <ul className="space-y-3">
        {articles.map((article) => (
          <li key={article.id}>
            <Link
              href={article.link}
              className="underline font-normal text-sm hover:text-primary"
              style={{ color: linkColor }}
            >
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
