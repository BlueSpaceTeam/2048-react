/*
 * @Author: swancai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime: 2022-07-01 15:36:47
 * @LastEditors: swancai
 * @Description:
 * @FilePath: \ts\2048-react\react\src\pages\Game.tsx
 */

import { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import LogoButton from '@components/Game/LogoButton';
import Score from '@components/Game/Score';
import Board from '@components/Game/Board';
import GameButton from '@components/Game/GameButton';

import Languages from '@components/common/Languages';
import Portal from '@components/common/Portal';
import ResultModal from '@components/Game/ResultModal';

import { usePrevious } from '@utils/hooks';
import { startTimeDiff, endTimeDiff } from '@utils/timer';

import {
  genNewNum,
  checkPerpendicularDirPossibility,
  getMoveResult,
} from '@utils/movingLogic';

// 引入声音模块
import useSound from 'use-sound';
import beepSfx from '@/sfx/s1.mp3';

import {
  Direction,
  IAHistoryOfSquares,
  STORAGE_GAME_HISTORY,
  STORAGE_BEST_SCORE,
} from '@utils/constants';

import '@scss/game.scss';

// interface IGame {}

// 初始化的方块历史
const initialHistory = {
  squares: new Array(16).fill(0),
  score: 0,
  randomNumIdx: -1,
};

/**
 * 游戏
 */
// const Game: React.FC<IGame> = (props) => {
const Game: React.FC = (props) => {
  const { t } = useTranslation();
  // 游戏移动记录：[初始记录,(上一步记录,)当前记录]。只记录最近操作的2步，故包括初始数组最多长度为3
  const [history, setHistory] = useState<IAHistoryOfSquares[]>([initialHistory]);
  // 总耗时（毫秒）
  const [timeSpent, setTimeSpent] = useState<number>(0);
  // 游戏是否结束
  const [isOver, setIsOver] = useState<boolean>(false);
  // 最高分
  const [bestScore, setBestScore] = useState<number>(
    Number(localStorage.getItem(STORAGE_BEST_SCORE) || 0)
  );
  // 最高分原始值
  const preBestScore: number = usePrevious(bestScore) || 0;

  // 记录上一步操作, 其值有 new：新建，move: 移动，undo: 撤销
  const [act, setAct] = useState<string>('new');
  // btn-undo是否可点击
  const disabledUndo: boolean = isOver || history.length <= 1 || act != 'move';
  
  // 音效播放，isMuted默认false（不静音）
  const [isMuted, setMuted] = useState<boolean>(false);
  const [playSfx] = useSound(beepSfx, { soundEnabled: !isMuted });

  // 从垂直于当前操作方向的方向来检查没有机会合并，game over的回调处理
  const gameOverCallback: () => void = () => {
    // 结束时间差计算
    setTimeSpent(endTimeDiff());

    const curScore: number = history[history.length - 1].score;
    if (curScore > preBestScore) {
      setBestScore(curScore);
      localStorage.setItem(STORAGE_BEST_SCORE, curScore + '');
    }
    setIsOver(true);
    localStorage.removeItem(STORAGE_GAME_HISTORY);
  };

  /**
   * 移动处理
   *
   **/
  function handleMove(direction: Direction): void {
    if (isOver) return;

    const currentHistory: IAHistoryOfSquares = history[history.length - 1];
    // 生成移动结果及得分
    const { arr = [], scoreDelta = 0 } = getMoveResult(
      direction,
      currentHistory.squares!.slice()
    );
    // 如果完全相同，则不发生变化
    if (JSON.stringify(currentHistory.squares) === JSON.stringify(arr)) {
      // 从垂直于当前操作方向的方向来检查是否仍然有机会合并，如果没有则认为游戏结束
      if (!checkPerpendicularDirPossibility(direction, arr)) {
        gameOverCallback();
      }
      return;
    } else {
      // 从垂直于当前操作方向的方向来检查是否仍然有机会合并，如果没有则认为游戏结束
      if (!checkPerpendicularDirPossibility(direction, arr)) {
        gameOverCallback();
        return;
      }
    }

    // 播放音效
    playSfx();
    // 随机生成方块并替换当前历史
    const { idx: idxNew, arr: squareNew } = genNewNum(arr);
    const newHistory: IAHistoryOfSquares[] = history.slice();
    // 只保留初始记录 和 最近2次的操作记录
    if (newHistory.length > 2) {
      newHistory.splice(1, 1);
    }
    newHistory.splice(newHistory.length, 1, {
      squares: squareNew,
      score: newHistory[newHistory.length - 1].score + scoreDelta,
      randomNumIdx: idxNew,
    });

    setHistory(newHistory);
    setAct('move');
  }

  const resetHistory: () => void = () => {
    // 生成新数字
    const { idx: idxNew, arr: squareNew } = genNewNum(initialHistory.squares);
    // 设置历史记录
    setHistory([
      initialHistory,
      {
        squares: squareNew,
        score: 0,
        randomNumIdx: idxNew,
      },
    ]);
    setAct('new');
  };

  /**
   * @name: startGame
   * @description: 开始游戏的基础方法
   * @param {IAHistoryOfSquares} SHistory
   * @return {*}
   */
  const startGame = (SHistory?: IAHistoryOfSquares[]): void => {
    // 开始时间差计算
    startTimeDiff();

    if (SHistory && SHistory.length > 1) {
      setHistory(SHistory);
      setAct(SHistory.length > 2 ? 'move' : 'new');
    } else {
      resetHistory();
    }
  };

  // 撤销上一步
  const undoGame: () => void = () => {
    if (history.length > 1 && act === 'move') {
      // 除了初始数组外，存在上一步方可撤销
      setHistory((oldHistory: IAHistoryOfSquares[]) =>
        oldHistory.slice(0, oldHistory.length - 1)
      );
      setAct('undo');
    }
  };

  // 初始化游戏界面
  useEffect(() => {
    const StorageHistoryStr: string = localStorage.getItem(STORAGE_GAME_HISTORY) || '';
    if (StorageHistoryStr) {
      const SHistory: IAHistoryOfSquares[] = JSON.parse(StorageHistoryStr);
      startGame(SHistory);
    } else {
      resetHistory();
    }
  }, []);

  // 记录操作至缓存
  useEffect(() => {
    localStorage.setItem(STORAGE_GAME_HISTORY, JSON.stringify(history));
  }, [history]);

  // 控制Modal
  const ModalUI: JSX.Element | null = isOver ? (
    <Portal>
      <ResultModal
        isShow={isOver}
        score={history[history.length - 1].score}
        timeSpent={timeSpent}
        bestScore={preBestScore}
        onRestart={() => startGame()}
        onClose={() => setIsOver(false)}
      />
    </Portal>
  ) : null;

  return (
    <div className="game">
      <header>
        <LogoButton />
        <Score name="score.score" num={history[history.length - 1].score} />
        <Score name="score.your_best" num={bestScore} />
        <GameButton name="game.new" onClick={() => startGame()} />
        <GameButton
          name="game.undo"
          btnDisabled={disabledUndo}
          onClick={() => undoGame()}
        />
        <GameButton
          name={isMuted ? 'game.muted' : 'game.unmuted'}
          className={isMuted ? '' : 'btn-unmuted'}
          onClick={() => setMuted(!isMuted)}
        />
      </header>
      <main>
        <p className="desc">{t('game.introduce')}</p>
        <Board
          randomNumIdx={history[history.length - 1].randomNumIdx}
          squares={history[history.length - 1].squares}
          onMove={(dir: Direction) => handleMove(dir)}
        />
      </main>

      <Languages />

      {ModalUI}
    </div>
  );
};

export default Game;
