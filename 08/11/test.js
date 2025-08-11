// function lengthOfLongestSubstring (s) {
//     const last = new Map()
//     let left = 0, ans = 0
//     for (let right = 0; right < s.length; right++) {
//         const ch = s[right]
//         if (last.has(ch) && last.get(ch) >= left) {
//             left = last.get(ch) + 1
//         }
//         ans = Math.max(ans, right - left + 1)
//     }
//     return ans
// }
function lengthOfLongestSubstring_ascii(s) {
  const last = new Array(256).fill(-1); // 256个位置，初始化为 -1
  let left = 0, ans = 0;
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i);       // 直接拿字符的 UTF-16 码值
    if (last[code] >= left) {
      left = last[code] + 1;
    }
    last[code] = i;
    console.log(last)
    ans = Math.max(ans, i - left + 1);
  }
  return ans;
}
console.log(lengthOfLongestSubstring_ascii('abbac'))
/** Day 08/11：最长无重复子串
 *  题目：给定字符串 s，返回不含重复字符的最长子串长度。
 *  解析：使用map来存放每个字母最后存放的下标, 用left和right来表示区间，出现重复的切在区间类的则更新left的位置
 *  优化可以用数组来存储，根据ASCII码表，在对应数字或字母的位置添加索引，相当于每个字符可以直接用一个 整数下标（字符码）表示，直接访问数组对应的位置即可。
不需要做哈希，也不需要处理字符串键，直接 O(1) 取值。
 * */
