import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CommentsList from "./m-commentsList";
import ReplyDataService from "../../services/reply.service";

jest.mock("../../services/reply.service", () => ({
    vote: jest.fn(),
}));

describe("CommentsList", () => {
    it("should call ReplyDataService.vote with the correct parameters when handleVote is called", () => {
        const replyId = 123;
        const voteType = 1;
        const citizenId = 456;

        // Render the component
        const { container } = render(
            <CommentsList
                repliesProp={null}
                solutionId={null}
                handleReply={null}
                sortValue={""}
            />
        );

        // Mock the vote function
        const mockVote = ReplyDataService.vote as jest.MockedFunction<typeof ReplyDataService.vote>;

        // Trigger the handleVote function
        fireEvent.click(container.querySelector("button")!);

        // Verify that ReplyDataService.vote was called with the correct parameters
        expect(mockVote).toHaveBeenCalledWith({
            replyId: replyId,
            citizenId: citizenId,
            vote: voteType,
        });
    });
});
