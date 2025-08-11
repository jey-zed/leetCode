function lengthOfLongestSubstring (s) {
    const last = new Map()
    let left = 0, ans = 0
    for (let right = 0; right < s.length; right++) {
        const ch = s[right]
        if (last.has(ch)) {
            left = last.get(ch) + 1
        }
        last.set(ch, right)
        ans = Math.max(ans, right - left + 1)
    }
    return ans
}
console.log(lengthOfLongestSubstring('abba'))
/** Day 08/11：最长无重复子串
 *  题目：给定字符串 s，返回不含重复字符的最长子串长度。
 *  解析：使用map来存放每个字母最后存放的下标
 * 
 * */
