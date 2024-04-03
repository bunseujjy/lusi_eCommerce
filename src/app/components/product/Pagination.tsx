import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function PaginationSection({
  convertValidStringQueries,
  selected,
  totalItems,
}: any) {
  const router = useRouter();
  const pages: any[] = [];
  const searchParams = useSearchParams();
  const path = usePathname();
  const page = searchParams.get("page") || (1 as any);
  const per_page = searchParams.get("per_page") || (6 as any);

  for (let i = 1; i <= Math.ceil(totalItems / per_page); i++) {
    pages.push(i);
  }

  return (
    <Pagination className="justify-end">
      <PaginationContent>
        <PaginationItem>
          {page - 1 >= 1 && (
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() =>
                router.push(
                  convertValidStringQueries
                    ? `${path}/?page=${
                        Number(page) - 1
                      }${convertValidStringQueries(selected)}`
                    : `${path}/?page=${Number(page) - 1}`
                )
              }
            />
          )}
        </PaginationItem>
        {pages.map((pageIndex) => (
          <PaginationItem
            key={pageIndex}
            className={`${Number(page) === pageIndex ? "bg-slate-500" : ""}`}
          >
            <PaginationLink
              onClick={() =>
                router.push(
                  convertValidStringQueries
                    ? `${path}/?page=${Number(
                        pageIndex
                      )}${convertValidStringQueries(selected)}`
                    : `${path}/?page=${Number(pageIndex)}`
                )
              }
              className="cursor-pointer"
            >
              {pageIndex}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          {page < pages.length && (
            <PaginationNext
              className="cursor-pointer"
              onClick={() =>
                router.push(
                  convertValidStringQueries
                    ? `${path}/?page=${
                        Number(page) + 1
                      }${convertValidStringQueries(selected)}`
                    : `${path}/?page=${Number(page) + 1}`
                )
              }
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
