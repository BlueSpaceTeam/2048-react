/*
 * @Author: swancai
 * @LastEditors: tim.wen
 */
import {
  MATRIX_ROW,
  MATRIX_COL,
  RIGHT,
  LEFT,
  DOWN,
  UP,
  Direction,
} from '@utils/constants';

// 当前格对应一元数组的下标 —— 函数式编程
const getSquareIdx: (row: number, col: number) => number = (row, col) =>
  (row - 1) * MATRIX_COL + (col - 1);
// 获取行号
const getRow: (col: number, squareIdx: number) => number = (col, squareIdx) =>
  (squareIdx - col + 1) / MATRIX_COL + 1;
// 获取列号
const getCol: (row: number, squareIdx: number) => number = (row, squareIdx) =>
  squareIdx + 1 - (row - 1) * MATRIX_COL;

// 随机生产的数字的值和位置
interface IGenNewNumObj {
  idx: number; // 随机生产的块数组元素的下标
  arr: number[]; // 新的方块数组
}
export function genNewNum(squares: number[]): IGenNewNumObj {
  const arr = squares.slice();
  const emptyIdxs: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i]) {
      emptyIdxs.push(i);
    }
  }
  if (!emptyIdxs.length) {
    // 返回自身，避免用空数组覆盖原来结果
    return { idx: -1, arr };
  }
  // 从1到coutZero里随机生成一个位置
  const idx = emptyIdxs[Math.round(Math.random() * (emptyIdxs.length - 1))];
  // 随机设置2或4
  arr[idx] = Math.round(Math.random()) ? 2 : 4;
  return { idx, arr };
}

// 检查垂直于用户移动方向的方向上是否存在合并或者移动的可能性
export function checkPerpendicularDirPossibility(
  direction: Direction,
  squares: number[]
): boolean {
  let possibility = false;
  switch (direction) {
    case UP:
    case DOWN: {
      // 垂直的方向为：LEFT
      // 从第1行开始
      for (let row = 1; row <= MATRIX_ROW; row++) {
        if (possibility) break;

        // 从第2列开始往移动方向合并
        for (let col = 2; col <= MATRIX_COL; col++) {
          if (possibility) break;
          // 每列开始值对应一元数组的下标
          const curColIdx: number = getSquareIdx(row, col);
          if (squares[curColIdx]) {
            // 当前列有值的情况
            // preColIdx ：移动方向的前一列Idx
            const preColIdx: number = getSquareIdx(row, col - 1);
            if (
              !squares[preColIdx] ||
              (squares[preColIdx] && squares[curColIdx] === squares[preColIdx])
            ) {
              possibility = true;
            }
          } else {
            possibility = true;
          }
        }
      }
      break;
    }
    case LEFT:
    case RIGHT: {
      // 垂直的方向为：UP
      // 从第1列开始
      for (let col = 1; col <= MATRIX_COL; col++) {
        if (possibility) break;

        // 从第2行开始往移动方向合并
        for (let row = 2; row <= MATRIX_ROW; row++) {
          if (possibility) break;
          // 每行开始值对应一元数组的下标
          const curRowIdx: number = getSquareIdx(row, col);
          if (squares[curRowIdx]) {
            // 当前行有值的情况
            // preRowIdx ：移动方向的前一行Idx
            const preRowIdx: number = getSquareIdx(row - 1, col);
            if (
              !squares[preRowIdx] ||
              (squares[preRowIdx] && squares[curRowIdx] === squares[preRowIdx])
            ) {
              possibility = true;
            }
          } else {
            possibility = true;
          }
        }
      }
      break;
    }
  }
  return possibility;
}

/**
 * @description: 处理移动事件的方块移动合并结果及得分
 * @param {Direction} direction 当前移动方向
 * @param {number} originArr 上一步移动结果
 * @return {arr, scoreDelta} 返回结果及本次得分
 */
export function getMoveResult(direction: Direction, originArr: number[]) {
  const arr: number[] = originArr.slice();
  let scoreDelta = 0; // 本轮新增的得分
  switch (direction) {
    case UP: {
      if (MATRIX_ROW > 1) {
        // 从第1列开始
        for (let col = 1; col <= MATRIX_COL; col++) {
          // 每行和前一行的下标相差值
          const rowIdxDelta: number = MATRIX_COL;
          // 行的开始指针，根据是否合并而更改移动后能比较的方块的最小下标值，默认从第1列开始
          let startPointer = 1;

          // 从第2行开始往移动方向合并
          for (let row = 2; row <= MATRIX_ROW; row++) {
            // 最后一个下标序号
            const preEndIdx: number = getSquareIdx(startPointer, col);
            // 每行开始值对应一元数组的下标
            const curRowIdx: number = getSquareIdx(row, col);
            if (arr[curRowIdx]) {
              // 当前行有值的情况
              // console.log(`startPointer=${startPointer}, preEndIdx=${preEndIdx}, col=${col}, row=${row}, squareIdx=${curRowIdx}`)
              // preRowIdx ：移动方向的前一行Idx
              for (
                let preRowIdx: number = getSquareIdx(row - 1, col);
                preRowIdx >= preEndIdx;
                preRowIdx -= rowIdxDelta
              ) {
                if (arr[preRowIdx]) {
                  if (arr[curRowIdx] === arr[preRowIdx]) {
                    // 合并
                    arr[preRowIdx] *= 2;
                    arr[curRowIdx] = 0;
                    // 最后+1是因为起始指针从合并的下一位开始
                    startPointer = getRow(col, preRowIdx) + 1;
                    // 计算分数
                    scoreDelta += arr[preRowIdx];
                  } else if ((curRowIdx - preRowIdx) / rowIdxDelta > 1) {
                    // curRowIdx - preRowIdx 之间有空格，则放置离lastRowIdx最近一格
                    arr[preRowIdx + rowIdxDelta] = arr[curRowIdx];
                    arr[curRowIdx] = 0;
                  }
                  break;
                } else if (!arr[preRowIdx] && preRowIdx === preEndIdx) {
                  // 往移动方向进方向，如果到达头部，则放置于此
                  arr[preRowIdx] = arr[curRowIdx];
                  arr[curRowIdx] = 0;
                }
                // 继续往移动方向进方向寻找
              }
            }
          }
        }
      }
      break;
    }
    case DOWN: {
      // 从倒数第2行开始往移动方向合并
      if (MATRIX_ROW > 1) {
        // 从第1列开始
        for (let col = 1; col <= MATRIX_COL; col++) {
          // 每行和前一行的下标相差值
          const rowIdxDelta: number = MATRIX_COL;
          // 行的开始指针，根据是否合并而更改移动后能比较的方块的最小下标值，默认从第1列开始
          let startPointer: number = MATRIX_ROW;

          // 从倒数第2行开始往移动方向合并
          for (let row: number = MATRIX_ROW - 1; row >= 1; row--) {
            // 最后一个下标序号
            const preEndIdx: number = getSquareIdx(startPointer, col);
            // 每行开始值对应一元数组的下标
            const curRowIdx: number = getSquareIdx(row, col);
            if (arr[curRowIdx]) {
              // 当前行有值的情况
              // console.log(`startPointer=${startPointer}, preEndIdx=${preEndIdx}, col=${col}, row=${row}, squareIdx=${curRowIdx}`)
              // preRowIdx ：移动方向的前一行Idx
              for (
                let preRowIdx: number = getSquareIdx(row + 1, col);
                preRowIdx <= preEndIdx;
                preRowIdx += rowIdxDelta
              ) {
                if (arr[preRowIdx]) {
                  if (arr[curRowIdx] === arr[preRowIdx]) {
                    // 合并
                    arr[preRowIdx] *= 2;
                    arr[curRowIdx] = 0;
                    // 最后-1是因为起始指针从合并的下一位开始
                    startPointer = getRow(col, preRowIdx) - 1;
                    // 计算分数
                    scoreDelta += arr[preRowIdx];
                  } else if ((preRowIdx - curRowIdx) / rowIdxDelta > 1) {
                    // curRowIdx - preRowIdx 之间有空格，则放置离lastRowIdx最近一格
                    arr[preRowIdx - rowIdxDelta] = arr[curRowIdx];
                    arr[curRowIdx] = 0;
                  }
                  break;
                } else if (!arr[preRowIdx] && preRowIdx === preEndIdx) {
                  // 往移动方向进方向找，如果到达头部，则放置于此
                  arr[preRowIdx] = arr[curRowIdx];
                  arr[curRowIdx] = 0;
                }
                // 继续往移动方向进方向寻找
              }
            }
          }
        }
      }
      break;
    }
    case LEFT: {
      // 从第2列开始往移动方向合并
      if (MATRIX_COL > 1) {
        // 从第1行开始
        for (let row = 1; row <= MATRIX_ROW; row++) {
          // 每列和前一列的下标相差值
          const colIdxDelta = 1;
          // 列的开始指针，根据是否合并而更改移动后能比较的方块的最小下标值，默认从第1列开始
          let startPointer = 1;

          // 从第2列开始往移动方向合并
          for (let col = 2; col <= MATRIX_COL; col++) {
            // 最后一个下标序号
            const preEndIdx: number = getSquareIdx(row, startPointer);
            // 每列开始值对应一元数组的下标
            const curColIdx: number = getSquareIdx(row, col);
            if (arr[curColIdx]) {
              // 当前列有值的情况
              // console.log(`startPointer=${startPointer}, preEndIdx=${preEndIdx}, col=${col}, row=${row}, squareIdx=${curColIdx}`)
              // preColIdx ：移动方向的前一列Idx
              for (
                let preColIdx: number = getSquareIdx(row, col - 1);
                preColIdx >= preEndIdx;
                preColIdx -= colIdxDelta
              ) {
                if (arr[preColIdx]) {
                  if (arr[curColIdx] === arr[preColIdx]) {
                    // 合并
                    arr[preColIdx] *= 2;
                    arr[curColIdx] = 0;
                    // 最后+1是因为起始指针从合并的下一位开始
                    startPointer = getCol(row, preColIdx) + 1;
                    // 计算分数
                    scoreDelta += arr[preColIdx];
                  } else if ((curColIdx - preColIdx) / colIdxDelta > 1) {
                    // curColIdx - preColIdx 之间有空格，则放置离lastRowIdx最近一格
                    arr[preColIdx + colIdxDelta] = arr[curColIdx];
                    arr[curColIdx] = 0;
                  }
                  break;
                } else if (!arr[preColIdx] && preColIdx === preEndIdx) {
                  // 往移动方向进方向，如果到达头部，则放置于此
                  arr[preColIdx] = arr[curColIdx];
                  arr[curColIdx] = 0;
                }
                // 继续往移动方向进方向寻找
              }
            }
          }
        }
      }
      break;
    }
    case RIGHT: {
      // 从倒数第2列开始往移动方向合并
      if (MATRIX_COL > 1) {
        // 从第1行开始
        for (let row = 1; row <= MATRIX_ROW; row++) {
          // 每列和前一列的下标相差值
          const colIdxDelta = 1;
          // 列的开始指针，根据是否合并而更改移动后能比较的方块的最小下标值，默认从第1列开始
          let startPointer: number = MATRIX_COL;

          // 从倒数第2列开始往移动方向合并
          for (let col: number = MATRIX_COL - 1; col >= 1; col--) {
            // 最后一个下标序号
            const preEndIdx: number = getSquareIdx(row, startPointer);
            // 每列开始值对应一元数组的下标
            const curColIdx: number = getSquareIdx(row, col);
            if (arr[curColIdx]) {
              // 当前列有值的情况
              // console.log(`startPointer=${startPointer}, preEndIdx=${preEndIdx}, col=${col}, row=${row}, squareIdx=${curColIdx}`)
              // preColIdx ：移动方向的前一列Idx
              for (
                let preColIdx: number = getSquareIdx(row, col + 1);
                preColIdx <= preEndIdx;
                preColIdx += colIdxDelta
              ) {
                if (arr[preColIdx]) {
                  if (arr[curColIdx] === arr[preColIdx]) {
                    // 合并
                    arr[preColIdx] *= 2;
                    arr[curColIdx] = 0;
                    // 最后-1是因为起始指针从合并的下一位开始
                    startPointer = getCol(row, preColIdx) - 1;
                    // 计算分数
                    scoreDelta += arr[preColIdx];
                  } else if ((preColIdx - curColIdx) / colIdxDelta > 1) {
                    // curColIdx - preColIdx 之间有空格，则放置离lastRowIdx最近一格
                    arr[preColIdx - colIdxDelta] = arr[curColIdx];
                    arr[curColIdx] = 0;
                  }
                  break;
                } else if (!arr[preColIdx] && preColIdx === preEndIdx) {
                  // 往移动方向进方向，如果到达头部，则放置于此
                  arr[preColIdx] = arr[curColIdx];
                  arr[curColIdx] = 0;
                }
                // 继续往移动方向进方向寻找
              }
            }
          }
        }
      }
      break;
    }
  }
  return {
    arr,
    scoreDelta,
  };
}
