import styled from "styled-components";

const hospitalSpecialties = [
  "Medicina General",
  "Pediatría",
  "Ginecología",
  "Cardiología",
  "Endocrinología",
  "Neurología",
  "Dermatología",
  "Oftalmología",
  "Oncología",
  "Traumatología",
];

export const AppointmentEntry = ({
  appointment,
  index,
  handleInputChange,
  handleSpecializationChange,
  handleDoctorChange,
  specializations,
  filteredDoctors,
  handleRemoveAppointment,
}) => (
  <div>
    <Label>Motivo</Label>
    <Input
      type="text"
      name="details"
      value={appointment.details}
      onChange={(e) => handleInputChange(e, index)}
      placeholder="motivo de la cita"
    />
    <Row>
      <SelectContainer>
        <Label>Especialidad:</Label>
        <Select
          name="specialization"
          value={appointment.specialization}
          onChange={(e) => handleSpecializationChange(e, index)}
        >
          {specializations.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </Select>
      </SelectContainer>

      <SelectContainer>
        <Label>Médico:</Label>
        <Select
          name="doctorId"
          value={appointment.doctorId}
          onChange={(e) => handleDoctorChange(e, index)}
        >
          {filteredDoctors.map((doctor) => (
            <option key={doctor._id} value={doctor._id}>
              {doctor.name}
            </option>
          ))}
        </Select>
      </SelectContainer>
    </Row>
    <Label>Fecha:</Label>
    <Input
      type="date"
      name="date"
      value={appointment.date}
      onChange={(e) => handleInputChange(e, index)}
    />
    <Label>Hora:</Label>
    <Input
      type="time"
      name="time"
      value={appointment.time}
      onChange={(e) => handleInputChange(e, index)}
    />
    {/* <Label>Consultorio:</Label>
    <FormRow>
      <SelectContainer>
        <Label>Especialidad del Consultorio:</Label>
        <Select
          name="officeDetails"
          value={appointment.officeDetails.specialty || ""}
          onChange={(e) =>
            handleInputChange(e, index, "officeDetails", "specialty")
          }
        >
          {hospitalSpecialties.map((specialty) => (
            <option key={specialty} value={specialty}>
              {specialty}
            </option>
          ))}
        </Select>
      </SelectContainer>
      <InputContainer>
        <Label>Piso:</Label>
        <Input
          type="text"
          name="officeDetails"
          value={appointment.officeDetails.floor}
          onChange={(e) =>
            handleInputChange(e, index, "officeDetails", "floor")
          }
          placeholder="Piso"
        />
      </InputContainer>
      <InputContainer>
        <Label>Número:</Label>
        <Input
          type="text"
          name="officeDetails"
          value={appointment.officeDetails.number}
          onChange={(e) =>
            handleInputChange(e, index, "officeDetails", "number")
          }
          placeholder="Número de consultorio"
        />
      </InputContainer> */}
      <Button onClick={() => handleRemoveAppointment(index)}>
        Eliminar Cita
      </Button>
    {/* </FormRow> */}
  </div>
);
const FormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20px;
  padding: 15px;
  background-color: #f4f4f4;
  border-radius: 8px;
`;

const InputContainer = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  flex: 1;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  margin-top: 15px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
