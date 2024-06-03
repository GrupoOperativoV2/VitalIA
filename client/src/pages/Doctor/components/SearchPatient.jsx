import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../../../context/authContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export function SearchPatient() {
  const searchInputRef = useRef(null);
  const [result, setResult] = useState(null);
  const [query, setQuery] = useState("");
  const { getMedicalHistoryID } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (query.trim() === "") {
        setResult(null);
        return;
      }

      try {
        const data = await getMedicalHistoryID(query);
        setResult(data);
        toast.success("Paciente encontrado con éxito");
      } catch (error) {
        console.error('Error fetching medical history:', error);
        toast.error("Error al buscar el paciente");
        setResult(null);
      }
    };

    fetchData();
  }, [query, getMedicalHistoryID]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleResultClick = () => {
    navigate(`/previewpatient`, { state: { patientData: result } });
  };

  return (
    <Container>
      <h1>Buscar Paciente</h1>
      <SearchForm>
        <SearchInput
          ref={searchInputRef}
          type="text"
          placeholder="Buscar paciente..."
          value={query}
          onChange={handleInputChange}
        />
      </SearchForm>
      {result && (
        <ResultContainer onClick={handleResultClick}>
          <p><strong>ID:</strong> {result._id}</p>
          <p><strong>Nombre:</strong> {result.personalInformation.name}</p>
        </ResultContainer>
      )}
      <ToastContainer />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
  position: relative;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

const ResultContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  width: 100%;
  max-width: 500px;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
