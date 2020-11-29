import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/index";
// Components
import Header from "./components/header/Header.component";

// Pages
import UserRoute from "./components/UserRoute/UserRoute.component";
import BoardPage from "./pages/board/Board.page";
import ProfilePage from "./pages/profile/Profile.page";

import "./App.css";

export type Board = {
	title: string;
	columns: Array<any>; // Todo: define separate Column type
	admins: Array<string>;
	users: Array<string>;
	_id: string;
};

const App = () => {
	const [boards, setBoards] = React.useState<Board[] | undefined>([]);

	// This state is for displaying the board title in the header
	const [currentBoard, setCurrentBoard] = React.useState<Board | undefined>();
	return (
		<div className="App">
			<BrowserRouter>
				<AuthProvider>
					<Header currentBoard={currentBoard} />
					<Switch>
						<Route
							path={"/"}
							exact
							render={() => (
								<UserRoute
									setBoards={setBoards}
									boards={boards}
									setCurrentBoard={setCurrentBoard}
								/>
							)}
						/>
						<Route
							path={"/boards/:boardId"}
							exact
							render={() => (
								<BoardPage
									boards={boards}
									setCurrentBoard={setCurrentBoard}
								/>
							)}
						/>
						<Route path={"/profile"} exact component={ProfilePage} />
					</Switch>
				</AuthProvider>
			</BrowserRouter>
		</div>
	);
};

export default App;
