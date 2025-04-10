import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, Box, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
    const [todos, setTodos] = useState([
        {
            task: "Complete project documentation",
            priority: "high",
            isDone: false,
        },
        {
            task: "Buy groceries",
            priority: "medium",
            isDone: false,
        },
        {
            task: "Schedule dentist appointment",
            priority: "low",
            isDone: true,
        },
        {
            task: "Review pull requests",
            priority: "high",
            isDone: false,
        },
        {
            task: "Call mom",
            priority: "medium",
            isDone: true,
        },
        {
            task: "Update resume",
            priority: "high",
            isDone: false,
        },
        {
            task: "Clean garage",
            priority: "low",
            isDone: false,
        },
        {
            task: "Pay utility bills",
            priority: "high",
            isDone: true,
        },
    ]);
    const [priority, setPriority] = useState("medium");
    const [inputValue, setInputValue] = useState("");
    const [alertOpen, setAlertOpen] = useState(false); // alert 상태
    const [alertMessage, setAlertMessage] = useState("");

    const handleToggleTodo = (index) => {
        setTodos(
            todos.map((todo, i) =>
                i === index ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
    };

    const handleAddTodo = () => {
        if (inputValue.trim()) {
            // 사용자 입력값을 기반으로 메시지 설정
            setAlertMessage(`${inputValue} 할 일이 추가되었습니다!!`);
            setTodos([
                ...todos,
                { task: inputValue, priority: priority, isDone: false },
            ]);
            setInputValue("");
            setAlertOpen(true);
        }
    };

    // onClose 핸들러를 별도 함수로 만들 수도 있습니다.
    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") return;
        setAlertOpen(false);
    };

    return (
        <>
            {/* 할 일 추가 시 나타나는 알림 */}
            <Snackbar
                open={alertOpen}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: "center", horizontal: "center" }}
            >
                <Alert
                    onClose={handleCloseAlert}
                    variant="filled" // 혹은 원하는 variant ("standard", "outlined", "filled")
                    color="info"
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
            <Box
                sx={{
                    minHeight: "100vh",
                    width: "100vw",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Container
                    maxWidth="md"
                    sx={{
                        py: 4,
                        width: "60%",
                        minWidth: "800px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        margin: "0 auto",
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        align="center"
                        fontWeight="bold"
                    >
                        NEXT Todo App
                    </Typography>
                    <TodoForm
                        inputValue={inputValue}
                        handleInputChange={handleInputChange}
                        handleAddTodo={handleAddTodo}
                        handlePriorityChange={handlePriorityChange}
                        priority={priority}
                    />
                    <TodoList
                        todos={todos}
                        handleToggleTodo={handleToggleTodo}
                    />
                </Container>
            </Box>
        </>
    );
}

export default App;
