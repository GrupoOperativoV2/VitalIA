import { HiOutlineDesktopComputer } from "react-icons/hi";
import { CiMobile1 } from "react-icons/ci";
import { MdWorkspacesOutline } from "react-icons/md";


export const projectExperience = [
  {
    name: "Programación",
    projects: 76,
    icon: HiOutlineDesktopComputer,
    bg: "#286F6C",
  },
  {
    name: "Sistemas digitales",
    projects: 63,
    icon: CiMobile1,
    bg: "#EEC048",
  },
  {
    name: "Mecatrónica ",
    projects: 47,
    icon: MdWorkspacesOutline,
    bg: "#F26440",
  },
];

export const WhatDoIHelp = [
  "La Expo Batiz del CECyT 9 es un evento anual donde estudiantes exhiben proyectos tecnológicos e innovaciones científicas. Incluye demostraciones, competencias y talleres para fomentar el intercambio de conocimientos y creatividad."
];

export const workExp = [
  {
    place: "CECyT 9",
    tenure: "Agosto 2022",
    role: "Comienzos",
    detail:
     "Entramos a una nueva etapa donde el trabajo y el esfuerzo de cada día nos haría los mejores programadores del área. Con pasión y dedicación, enfrentamos desafíos y aprovechamos cada oportunidad para aprender y crecer, siempre con el objetivo de innovar y transformar el mundo digital."
  },
  {
    place: "Curso",
    tenure: "Ene 2023 - Dic 2023",
    role: " Un proceso",
    detail:
"El trabajo duro nos posicionó con la obtención de proyectos que cumplen las expectativas, pero sentíamos que faltaba algo más. Sabíamos que, además del cumplimiento, era necesario innovar y superar constantemente los estándares para realmente destacar."  },
  {
    place: "Godev",
    tenure: "Mar 2024",
    role: "Fundadores",
    detail:
      "Godev surge como una iniciativa de un grupo de estudiantes del CECyT 9 que, apasionados por la tecnología y el diseño, deciden unir sus talentos para crear una empresa enfocada en soluciones digitales innovadoras. Durante la Expo Batiz, presentan Godev como una startup dedicada al desarrollo de aplicaciones y plataformas interactivas, destacándose por su enfoque en la experiencia de usuario y el diseño visual.",
  },
];


export const comments = [
  {
    name: "Olarte Tomás Kevin Saúl",
    post: "Programador",
    comment:
      "He trabajado arduamente en la codificación de nuestros proyectos, asegurándome de que cada línea de código sea eficiente y funcional. Estoy emocionado por lo que hemos logrado y lo que aún está por venir.",
    img: "./well.jpg",
  },
  {
    name: "Ibañez Nuñez Dante Alejandro",
    post: "Líder del proyecto",
    comment:
      "Guiar a este increíble equipo ha sido una experiencia enriquecedora. Nuestra dedicación y esfuerzo nos han llevado a cumplir con las expectativas de nuestros clientes, pero siempre buscamos ir más allá.",
    img: "./people2.png",
  },
  {
    name: "Ávila Avendaño Luis Donovan",
    post: "Diseñador de Producto",
    comment:
      "Me enfoco en garantizar que nuestros productos no solo sean funcionales, sino también intuitivos y atractivos para los usuarios. La atención al detalle en cada diseño es clave para el éxito de nuestros proyectos.",
    img: "./people1.png",
  },
  {
    name: "Sanchéz Soriano Andrea Michelle",
    post: "Analista",
    comment:
      "Analizo y evalúo cada proyecto para asegurar que cumplimos con los más altos estándares de calidad. Nuestra capacidad para adaptarnos y mejorar continuamente es lo que nos distingue.",
    img: "./people2.png",
  },
];


export const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 1000,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  touchMove: true,
  useCSS: true,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
