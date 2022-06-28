/*
 * @Author: fantiga
 * @Date: 2022-06-28 10:39:12
 * @LastEditTime: 2022-06-28 11:53:57
 * @LastEditors: fantiga
 * @Description: 
 * @FilePath: /2048-react/react/src/utils/i18n.tsx
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    'en-US': {
        translation: {
            'play': 'play',
            'ranking': 'ranking',
            'new': 'new',
            'undo': 'undo',
            'unmuted': 'unmuted',
            'muted': 'muted',
            'Join the numbers and get to the 2048 tile!': 'Join the numbers and get to the 2048 tile!',
            'score': 'score',
            'your best': 'your best',
            'Congratulations': 'Congratulations',
            'You has got a best score:': 'You has got a best score:',
            'Game Over': 'Game Over',
            'Current Score:': 'Current Score:',
            'Best Score:': 'Best Score:',
            'Enter your name': 'Enter your name',
            'Save Record': 'Save Record',
            'Opps! Something wrong. Please try again later.': 'Opps! Something wrong. Please try again later.',
            'No, thanks': 'No, thanks',
            'Please enter your name': 'Please enter your name',
            'response is error': 'response is error',
            'Play Again': 'Play Again',
            'Home': 'Home',
        }
    },
    'zh-CN': {
        translation: {
            'play': '开始游戏',
            'ranking': '全球排行榜',
            'new': '新游戏',
            'undo': '撤销',
            'unmuted': '取消静音',
            'muted': '静音',
            'Join the numbers and get to the 2048 tile!': '合并数字方块，使它们变成2048！',
            'score': '分数',
            'your best': '你的最佳',
            'Congratulations': '恭喜！',
            'You has got a best score:': '你得到了一个高分：',
            'Game Over': '游戏结束',
            'Current Score:': '当前分数：',
            'Best Score:': '最佳分数：',
            'Enter your name': '输入您的名字',
            'Save Record': '保存记录',
            'Opps! Something wrong. Please try again later.': '啊！似乎遇到了什么问题。请稍后再试一次。',
            'No, thanks': '不，谢谢',
            'Please enter your name': '请输入您的名字',
            'response is error': '响应错误',
            'Play Again': '再玩一次',
            'Home': '首页',
        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'zh-CN', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;