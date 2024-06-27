import React, { useState } from "react";
import { Container, VStack, HStack, Input, Button, Text, IconButton, Checkbox } from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const addTask = () => {
    if (taskText.trim() === "") return;
    if (editIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editIndex ? { ...task, text: taskText } : task
      );
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: taskText, completed: false }]);
    }
    setTaskText("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setTaskText(tasks[index].text);
    setEditIndex(index);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input
            placeholder="Enter a task"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
          <Button onClick={addTask}>{editIndex !== null ? "Edit Task" : "Add Task"}</Button>
        </HStack>
        <VStack spacing={2} width="100%">
          {tasks.map((task, index) => (
            <HStack key={index} width="100%" justifyContent="space-between">
              <Checkbox
                isChecked={task.completed}
                onChange={() => toggleTaskCompletion(index)}
              >
                <Text as={task.completed ? "s" : undefined}>{task.text}</Text>
              </Checkbox>
              <HStack>
                <IconButton
                  aria-label="Edit"
                  icon={<FaEdit />}
                  onClick={() => editTask(index)}
                />
                <IconButton
                  aria-label="Delete"
                  icon={<FaTrash />}
                  onClick={() => deleteTask(index)}
                />
              </HStack>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;