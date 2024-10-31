import { getBoard } from '@/actions/projects/get-board';
import React from 'react';

import Container from '@/app/[locale]/(routes)/components/ui/Container';
import NewSectionDialog from './dialogs/NewSection';

import NewTaskInProjectDialog from './dialogs/NewTaskInProject';
import { getActiveUsers } from '@/actions/get-users';
import { getBoardSections } from '@/actions/projects/get-board-sections';
import DeleteProjectDialog from './dialogs/DeleteProject';
import { getKanbanData } from '@/actions/projects/get-kanban-data';
import Kanban from './components/Kanban';
import { getBoards } from '@/actions/projects/get-boards';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import type { Users } from '@prisma/client';
import AiAssistantProject from './components/AiAssistantProject';

interface BoardDetailProps {
  params: { boardId: string };
}

export const maxDuration = 300;

const BoardPage = async ({ params }: BoardDetailProps) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const { boardId } = params;
  const board: any = await getBoard(boardId);
  const boards = await getBoards(user?.id!);
  const users: Users[] = await getActiveUsers();
  const sections: any = await getBoardSections(boardId);
  const kanbanData = await getKanbanData(boardId);

  //console.log(board, "board");
  return (
    <Container
      title={board?.board?.title}
      description={board?.board?.description}
      visibility={board?.board?.visibility}
    >
      <div className="flex w-full justify-between py-5">
        <div className="space-x-2">
          <NewSectionDialog boardId={boardId} />
          <NewTaskInProjectDialog
            boardId={boardId}
            users={users}
            sections={sections}
          />
          {session ? (
            <AiAssistantProject session={session} boardId={boardId} />
          ) : null}
        </div>
        <div>
          <DeleteProjectDialog
            boardId={boardId}
            boardName={board.board.title}
          />
        </div>
      </div>
      <Kanban
        data={kanbanData.sections}
        boardId={boardId}
        boards={boards}
        users={users}
      />
    </Container>
  );
};

export default BoardPage;
