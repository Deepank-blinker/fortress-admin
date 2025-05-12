'use client';
import Typography from '@/components/custom/typography';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { API_ROUTES } from '@/constants/api.routes';
import { fetchFaqs } from '@/services/faqs.api';
import { useQuery } from '@tanstack/react-query';
import CreateUpdateFaqModal from './components/create-update-faq-modal';

function decodeHtml(html: string) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

const Page = () => {
  const { data: faqs, isPending } = useQuery({
    queryKey: [API_ROUTES.faqs.fetchFaqs.queryKey],
    queryFn: fetchFaqs,
  });

  return (
    <div className="bg-neutral-0 rounded-lg pb-10 ">
      <div className=" py-4 px-5 flex justify-between items-center border-b border-b-neutral-40 ">
        <Typography variant="h2" weight="bold">
          Frequently asked questions
        </Typography>
        <div>
          <CreateUpdateFaqModal edit={false} showButtonText />
        </div>
      </div>
      <br className="h-10" />

      {/* faqs */}
      <div className="flex justify-center w-full">
        <div className="w-full max-w-4xl">
          <Accordion type="single" collapsible>
            {isPending ? (
              // Skeleton Loader
              <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="space-y-3 p-4">
                    <Skeleton className="h-6 w-3/4 bg-neutral-20 rounded-lg" />
                    <Skeleton className="h-5 w-full bg-neutral-20 rounded-lg" />
                    <Skeleton className="h-5 w-full bg-neutral-20 rounded-lg" />
                    <Skeleton className="h-5 w-full bg-neutral-20 rounded-lg" />
                    <Skeleton className="h-5 w-full bg-neutral-20 rounded-lg" />
                  </div>
                ))}
              </div>
            ) : faqs?.data?.data?.length === 0 ? (
              <div className="flex justify-center items-center my-20">
                <Typography variant="h2" color="text-neutral-100">
                  No FAQs found
                </Typography>
              </div>
            ) : (
              faqs?.data?.data?.map((item, index) => (
                <AccordionItem
                  key={`${item.question}-${index}`}
                  value={`item-${index}`}
                  className="p-3 gap-4"
                >
                  <AccordionTrigger className="no-underline outline-none hover:no-underline pb-3">
                    <div className="flxe-1 w-full text-left flex items-center gap-4">
                      <Typography
                        variant="h4"
                        weight="bold"
                        color="text-neutral-800"
                      >
                        {item.question}
                      </Typography>
                      <CreateUpdateFaqModal
                        edit={true}
                        data={{
                          answer: item.answer,
                          question: item.question,
                          id: item.id,
                        }}
                        showButtonText
                        triggerButtonClassName=" outline-none px-3 h-8"
                        iconSize="1rem"
                        iconClassName="text-neutral-100 !text-[0.5rem]"
                        textClassName="!text-neutral-100 text-sm"
                      />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-neutral-20 p-2 rounded-md">
                    <div
                      className="prose prose-sm text-neutral-400 text-xl leading-[1.4rem] pt-3"
                      dangerouslySetInnerHTML={{
                        __html: decodeHtml(item.answer),
                      }}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))
            )}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Page;
