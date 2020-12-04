import * as React from "react";
import { useAuthState } from "../../context/index";
import { getCardsFromColumn } from "../../utils/utils";

import AddIcon from "@material-ui/icons/Add";
import CardThumbnail from "../../components/card-thumbnail/CardThumbnail.component";
import "./BoardColumn.styles.css";

export type Card = {
	title: string;
	comments: Array<Comment> | [];
	labels: Array<{ body: string; color: string }> | [];
	attachments: Array<{ fileName: string }> | [];
	_id: string;
};

type Comment = {
	body: string;
	user: string;
};

type Props = {
	title: string;
	columnId: string;
};

const BoardColumn = ({ title, columnId }: Props) => {
	const [cards, setCards] = React.useState<Array<Card> | undefined>();
	const { token } = useAuthState();
	React.useEffect(() => {
		getCardsFromColumn(setCards, columnId, token);
	}, [token, columnId]);
	return cards ? (
		<div className="column">
			<h2 className="column-title">{title}</h2>
			{cards.map((card) => (
				<CardThumbnail key={card._id} card={card}></CardThumbnail>
			))}
			<div className="add-card">
				<AddIcon className="add-icon" />
				<p className="add-card-text">Add another card</p>
			</div>
		</div>
	) : (
		<h2>LOADING</h2>
	);
};

export default BoardColumn;
