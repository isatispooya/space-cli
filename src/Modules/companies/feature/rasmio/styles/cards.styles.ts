import styled from "styled-components";

export const CardContainer = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  width: 100%;
  height: 500px;
  margin: 0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #2196f3, #1565c0);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
  }
`;

export const FlipCardContainer = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlipCardInner = styled.div<{ isFlipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform: ${(props) => (props.isFlipped ? "rotateY(180deg)" : "rotateY(0)")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlipCardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FlipCardFront = styled(FlipCardFace)``;

export const FlipCardBack = styled(FlipCardFace)`
  transform: rotateY(180deg);
  background: linear-gradient(145deg, #ffffff, #f5f5f5);
  padding: 2rem;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 220px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin: 0.5rem 0;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  text-align: center;
  &:focus {
    outline: none;
    border-color: #2196f3;
  }
`;

export const AddCardContainer = styled(CardContainer)`
  width: 100%;
  height: 100%;
  margin: 0;
  background: linear-gradient(145deg, #ffffff, #f5f5f5);

  .add-icon {
    width: 64px;
    height: 64px;
    color: #2196f3;
    transition: transform 0.5s ease;
  }


  h3 {
    margin-top: 1rem;
    color: #2196f3;
    font-size: 1.2rem;
  }
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
  > * {
    height: 500px;
  }
`;

export const CompanyName = styled.h2`
  color: #333;
  font-size: 1.4rem;
  margin: 1rem 0;
  text-align: center;
`;

export const InfoText = styled.p`
  color: #666;
  margin: 0.3rem 0;
  font-size: 0.9rem;
  line-height: 1.4;
  text-align: center;
`;

export const CompanyType = styled(InfoText)`
  color: #2196f3;
  font-weight: 600;
  margin: 0.5rem 0;
  font-size: 1rem;
`; 