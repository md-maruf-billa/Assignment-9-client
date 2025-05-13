import { Request, Response } from 'express';
import { VoteService } from '../services/vote.service';
import { catchAsyncResponse } from '../utils/catchAsync';
import { manageResponse } from '../utils/manageResponse';

const voteService = new VoteService();

export const voteController = {
    getAllVote: catchAsyncResponse(async (req: Request, res: Response) => {
        const result = await voteService.getAllVote();
        manageResponse(res, {
            statusCode: 200,
            success: true,
            message: 'All votes retrieved successfully',
            data: result,
        });
    }),

    castVote: catchAsyncResponse(async (req: Request, res: Response) => {
        const { reviewId, type } = req.body;
        const accountEmail = req.user?.email;

        if (!accountEmail) {
            return manageResponse(res, {
                statusCode: 401,
                success: false,
                message: 'Unauthorized access',
            });
        }

        const result = await voteService.castVote(reviewId, accountEmail, type);
        manageResponse(res, {
            statusCode: 201,
            success: true,
            message: 'Vote cast successfully',
            data: result,
        });
    }),

    unvote: catchAsyncResponse(async (req: Request, res: Response) => {
        const { reviewId } = req.query;
        const accountEmail = req.user?.email;

        if (!accountEmail) {
            return manageResponse(res, {
                statusCode: 401,
                success: false,
                message: 'Unauthorized access',
            });
        }

        const result = await voteService.unvote(reviewId as string, accountEmail);
        manageResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Vote removed successfully',
            data: result,
        });
    }),
}; 