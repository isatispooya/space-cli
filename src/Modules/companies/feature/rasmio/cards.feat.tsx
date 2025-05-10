import { useNavigate } from "react-router-dom";
import useCompany from "../../hooks/useCompany";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { CompanyType } from "../../types/company.type";
import {
  CardContainer,
  FlipCardContainer,
  FlipCardInner,
  FlipCardFront,
  FlipCardBack,
  Input,
  AddCardContainer,
  CardsGrid,
  CompanyName,
  InfoText,
} from "./styles/cards.styles";

const Cards = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [newCompany, setNewCompany] = useState({
    national_id: "",
  });

  const { data: staticCompanyData, isLoading } =
    useCompany.useGetCompanyRasmio();

  const { mutate: postCompanyRasmio } = useCompany.usePostCompanyRasmio();

  const navigate = useNavigate();

  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCardClick = (id: number) => {
    navigate(`/companies/companyrasmio/details/${id}/`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("national_id", newCompany.national_id);

    postCompanyRasmio(formData, {
      onSuccess: (response) => {
        setIsFlipped(false);
        navigate(`/companies/companyrasmio/details/${response.company.id}/`);
      },
    });
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md w-full mt-10">
      <div className="bg-white">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-1">
          سامانه مدیریت شرکت ها در سامانه رسمیو
        </h1>
        <p className="text-gray-600 text-center text-sm">
          مدیریت و پیگیری شرکت ها در سامانه رسمیو به صورت هوشمند
        </p>
      </div>
      <CardsGrid>
        <FlipCardContainer>
          <FlipCardInner isFlipped={isFlipped}>
            <FlipCardFront>
              <AddCardContainer
                onClick={handleAddClick}
                className="flex items-center justify-center"
              >
                <div className="text-center">
                  <AiOutlinePlus
                    className="add-icon mx-auto"
                    style={{ width: "96px", height: "96px" }}
                  />
                  <h3 className="mt-6 text-xl">افزودن شرکت جدید</h3>
                </div>
              </AddCardContainer>
            </FlipCardFront>
            <FlipCardBack>
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-md mx-auto flex flex-col justify-center h-full gap-6"
              >
                <h3 className="text-xl font-bold mb-8 text-indigo-600">
                  شناسه شرکت جدید
                </h3>
                <Input
                  type="text"
                  name="national_id"
                  placeholder="شناسه شرکت"
                  value={newCompany.national_id}
                  onChange={handleInputChange}
                  className="text-sm py-3"
                />
                <div className="flex gap-4 mt-8 w-full justify-center">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 flex-1 max-w-[180px] text-lg"
                  >
                    ثبت
                  </button>
                  <button
                    type="button"
                    onClick={handleAddClick}
                    className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-300 flex-1 max-w-[180px] text-lg"
                  >
                    بازگشت
                  </button>
                </div>
              </form>
            </FlipCardBack>
          </FlipCardInner>
        </FlipCardContainer>
        {isLoading ? (
          <div>درحال بارگذاری</div>
        ) : (
          Array.isArray(staticCompanyData) &&
          staticCompanyData.map((company: CompanyType) => (
            <CardContainer
              key={company.id}
              onClick={() => handleCardClick(company.id)}
            >
              <img
                className="w-full rounded-lg"
                src="https://taxxcelerate.com/wp-content/uploads/2024/06/pexels-photo-269077-269077.jpg"
                alt={company.title}
              />
              <div className="flex flex-col flex-grow justify-center gap-2">
                <CompanyName>{company.title}</CompanyName>
                <InfoText>{company.registration_type_title}</InfoText>
                <InfoText>{company.address || "ثبت نشده"}</InfoText>
                <InfoText>{company.description || "ثبت نشده"}</InfoText>
              </div>
            </CardContainer>
          ))
        )}
      </CardsGrid>
    </div>
  );
};

export default Cards;
