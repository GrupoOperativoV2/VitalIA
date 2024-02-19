import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, ButtonLink, Card, Input, Label } from "../components/ui";
import { useTasks } from "../context/tasksContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
import { Navbar } from "../components/NavbarGestion";

dayjs.extend(utc);

export function TaskFormPage() {
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        await updateTask(params.id, {
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      } else {
        await createTask({
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      }

      navigate("/tasks");
    } catch (error) {
      console.log(error);
      window.location.href = "/";
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue(
          "date",
          task.date ? dayjs.utc(task.date).format("YYYY-MM-DD") : ""
        );
        setValue("completed", task.completed);
      }
    };
    loadTask();
  }, [params.id, getTask, setValue]);

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Cuartos</h3>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            {...register("title")}
            autoFocus
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic">Please enter a title.</p>
          )}

          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            id="description"
            rows="3"
            placeholder="Description"
            {...register("description")}
          ></Textarea>

          <Label htmlFor="date">Date</Label>
          <Input type="date" name="date" {...register("date")} />
          <Button>Save</Button>
        </form>
        <ButtonLink to="/tasks">Registros</ButtonLink>
      </Card>
  
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Camillas</h3>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            {...register("title")}
            autoFocus
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic">Please enter a title.</p>
          )}

          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            id="description"
            rows="3"
            placeholder="Description"
            {...register("description")}
          ></Textarea>

          <Label htmlFor="date">Date</Label>
          <Input type="date" name="date" {...register("date")} />
          <Button>Save</Button>
        </form>
        <ButtonLink to="/tasks">Registros</ButtonLink>
      </Card>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Medicamentos</h3>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            {...register("title")}
            autoFocus
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic">Please enter a title.</p>
          )}

          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            id="description"
            rows="3"
            placeholder="Description"
            {...register("description")}
          ></Textarea>

          <Label htmlFor="date">Date</Label>
          <Input type="date" name="date" {...register("date")} />
          <Button>Save</Button>
        </form>
        <ButtonLink to="/tasks">Registros</ButtonLink>
      </Card> 
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Instrumentos</h3>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            {...register("title")}
            autoFocus
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic">Please enter a title.</p>
          )}

          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            id="description"
            rows="3"
            placeholder="Description"
            {...register("description")}
          ></Textarea>

          <Label htmlFor="date">Date</Label>
          <Input type="date" name="date" {...register("date")} />
          <Button>Save</Button>
        </form>
        <ButtonLink to="/tasks">Registros</ButtonLink>
      </Card>
      </div>
    </>
  );
}
