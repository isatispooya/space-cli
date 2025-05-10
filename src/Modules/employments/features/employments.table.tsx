import { useEmployments } from "../hooks";
import { Accordian } from "@/components";
import JobCard from "../components/jobCard";
import { useState } from "react";

const EmploymentsTable = () => {
  const { data } = useEmployments.useGetJobOffers();
  const [openAccordions, setOpenAccordions] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleAccordion = (id: number) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-4">
      {data?.map((job) => (
        <Accordian
          key={job.id}
          title={job.job_title}
          isOpen={openAccordions[job.id] || false}
          onToggle={() => toggleAccordion(job.id)}
        >
          <JobCard
            title={job.job_title}
            company={typeof job.company === "object" ? job.company.name : ""}
            location={job.job_location}
            description={job.job_description}
            requirements={job.eligibility_criteria.split("\n")}
            skills={[]}
            experience={job.experience}
            gender={job.gender}
            kindOfJob={job.kind_of_job}
            expirationDate={job.expiration_date}
            createdAt={job.created_at}
          />
        </Accordian>
      ))}
    </div>
  );
};

export default EmploymentsTable;
