"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  Code2,
  Database,
  Sparkles,
  Workflow,
  Wrench,
} from "lucide-react";

import {
  siC,
  siDjango,
  siDocker,
  siFastapi,
  siFlask,
  siGit,
  siHuggingface,
  siJavascript,
  siKeras,
  siLangchain,
  siMysql,
  siNumpy,
  siOpenjdk,
  siOpencv,
  siLanggraph,
  siPandas,
  siPostgresql,
  siPytorch,
  siPython,
  siReact,
  siScikitlearn,
  siStreamlit,
  siTailwindcss,
  siTensorflow,
  siTypescript,
} from "simple-icons";

import type { SimpleIcon } from "simple-icons";

type Skill = {
  name: string;
  icon?: SimpleIcon;
  color?: string;
};

type Category = {
  title: string;
  icon: typeof Code2;
  skills: Skill[];
};

const categories: Category[] = [
  {
    title: "Languages",
    icon: Code2,
    skills: [
      {
        name: "C",
        icon: siC,
        color: "#A8B9CC",
      },
      {
        name: "Python",
        icon: siPython,
        color: "#3776AB",
      },
      {
        name: "JavaScript",
        icon: siJavascript,
        color: "#F7DF1E",
      },
      {
        name: "TypeScript",
        icon: siTypescript,
        color: "#3178C6",
      },
      {
        name: "Java",
        icon: siOpenjdk,
        color: "#ED8B00",
      },
    ],
  },

  {
    title: "Frameworks and Libraries",
    icon: Wrench,
    skills: [
      {
        name: "React",
        icon: siReact,
        color: "#61DAFB",
      },
      {
        name: "Streamlit",
        icon: siStreamlit,
        color: "#FF4B4B",
      },
      {
        name: "Pandas",
        icon: siPandas,
        color: "#150458",
      },
      {
        name: "NumPy",
        icon: siNumpy,
        color: "#4DABCF",
      },
      {
        name: "Matplotlib",
        color: "#11557C",
      },
      {
        name: "Tailwind CSS",
        icon: siTailwindcss,
        color: "#06B6D4",
      },
    ],
  },

  {
    title: "Backend and Databases",
    icon: Database,
    skills: [
      {
        name: "Django",
        icon: siDjango,
        color: "#092E20",
      },
      {
        name: "FastAPI",
        icon: siFastapi,
        color: "#009688",
      },
      {
        name: "Flask",
        icon: siFlask,
        color: "#000000",
      },
      {
        name: "PostgreSQL",
        icon: siPostgresql,
        color: "#4169E1",
      },
      {
        name: "MySQL",
        icon: siMysql,
        color: "#4479A1",
      },
    ],
  },

  {
    title: "Machine Learning",
    icon: BrainCircuit,
    skills: [
      {
        name: "TensorFlow",
        icon: siTensorflow,
        color: "#FF6F00",
      },
      {
        name: "Keras",
        icon: siKeras,
        color: "#D00000",
      },
      {
        name: "Scikit-learn",
        icon: siScikitlearn,
        color: "#F7931E",
      },
      {
        name: "PyTorch",
        icon: siPytorch,
        color: "#EE4C2C",
      },
      {
        name: "OpenCV",
        icon: siOpencv,
        color: "#5C3EE8",
      },
    ],
  },

  {
    title: "Generative AI",
    icon: Sparkles,
    skills: [
      {
        name: "LangChain",
        icon: siLangchain,
        color: "#1C8C6C",
      },
      {
        name: "Hugging Face",
        icon: siHuggingface,
        color: "#FFD21E",
      },
      {
        name: "NLP",
        color: "#EC4899",
      },
    ],
  },

  {
    title: "Agentic AI",
    icon: Workflow,
    skills: [
      {
        name: "LangGraph",
        icon: siLanggraph,
        color: "#F97316",
      },
    ],
  },

  {
    title: "Tools and Platforms",
    icon: Wrench,
    skills: [
      {
        name: "Git",
        icon: siGit,
        color: "#F05032",
      },
      {
        name: "Docker",
        icon: siDocker,
        color: "#2496ED",
      },
      {
        name: "AWS",
        color: "#FF9900",
      },
      {
        name: "VS Code",
        color: "#007ACC",
      },
    ],
  },
];

function SkillLogo({ skill }: { skill: Skill }) {
  if (skill.icon) {
    return (
      <svg
        viewBox="0 0 24 24"
        role="img"
        aria-label={`${skill.name} logo`}
        className="h-7 w-7"
        fill={skill.color ?? "currentColor"}
      >
        <path d={skill.icon.path} />
      </svg>
    );
  }

  return (
    <span
      className="text-xs font-black tracking-tight"
      style={{
        color: skill.color ?? "currentColor",
      }}
      aria-hidden="true"
    >
      {skill.name}
    </span>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-18 relative overflow-hidden bg-background/50 grid-bg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-foreground mt-2 tracking-tight"
          >
            Technical Skillset
          </motion.h3>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {categories.map((category, categoryIndex) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: categoryIndex * 0.1,
                }}
                className="p-6 rounded-3xl border border-card-border bg-card-bg glass shadow-md flex flex-col gap-6"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 border-b border-card-border pb-4">
                  <div className="p-2.5 rounded-xl bg-card-bg border border-card-border shadow-sm">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>

                  <h4 className="text-lg font-bold text-foreground">
                    {category.title}
                  </h4>
                </div>

                {/* Skills */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3.5 rounded-2xl border border-card-border bg-background/50 hover:bg-card-bg flex flex-col items-center justify-center text-center gap-2.5 transition-all duration-200 shadow-sm hover:shadow-md hover:border-primary/30"
                    >
                      <div className="w-10 h-10 rounded-xl bg-card-bg border border-card-border flex items-center justify-center text-foreground">
                        <SkillLogo skill={skill} />
                      </div>

                      <p className="text-xs font-bold text-foreground">
                        {skill.name}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
