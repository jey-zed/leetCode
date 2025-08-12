function minWindow(s, t) {
  // 如果 t 或 s 是空字符串，直接返回空串
  if (!t.length || !s.length) return "";

  // need 存储 t 中每个字符需要的数量
  const need = new Map();
  for (const c of t) need.set(c, (need.get(c) || 0) + 1);
  // required 是需要满足的不同字符种类数
  let required = need.size;

  // l 是窗口左指针，formed 表示当前窗口已满足条件的字符种类数
  let l = 0, formed = 0;
  // windowCount 存储当前窗口中每个字符的数量
  const windowCount = new Map();
  // bestLen 最优解的长度（初始为无穷大），bestL 最优解左边界
  let bestLen = Infinity, bestL = 0;

  // r 作为窗口右指针，从左到右遍历 s
  for (let r = 0; r < s.length; r++) {
    const c = s[r];
    // 把右指针的字符加入窗口计数
    windowCount.set(c, (windowCount.get(c) || 0) + 1);
    // 如果该字符在 need 中，并且窗口里数量刚好满足需求，formed++
    if (need.has(c) && windowCount.get(c) === need.get(c)) formed++;

    // 当窗口已满足所有 required 种类的字符，尝试收缩窗口
    while (formed === required) {
      // 更新最优解：当前窗口比之前更短
      if (r - l + 1 < bestLen) { 
        bestLen = r - l + 1; 
        bestL = l; 
      }
      // 移出左指针字符
      const leftChar = s[l];
      windowCount.set(leftChar, windowCount.get(leftChar) - 1);
      // 如果移出后该字符数量少于需要的数量，说明不再满足，formed--
      if (need.has(leftChar) && windowCount.get(leftChar) < need.get(leftChar)) {
        formed--;
      }
      // 左指针右移
      l++;
    }
  }

  // 如果没找到符合条件的窗口（bestLen没变），返回空串，否则返回最优子串
  return bestLen === Infinity ? "" : s.slice(bestL, bestL + bestLen);
}

// quick tests
console.log(minWindow("ADOBECODEBANC", "ABC")); // "BANC"
console.log(minWindow("a", "a"));               // "a"
console.log(minWindow("a", "aa"));              // ""
console.log(minWindow("aa", "aa"));             // "aa"
