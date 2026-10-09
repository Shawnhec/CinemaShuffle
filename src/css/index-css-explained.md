# index.css 設定說明

這份文件逐一說明 [`src/index.css`](../index.css) 裡每個屬性的作用，以及為什麼這樣設定。章節順序跟 CSS 檔案的順序相同。

## 先看懂幾個單位

| 單位 | 意思 | 在這份 CSS 裡的用途 |
|---|---|---|
| `px` | 固定像素 | 邊框、圓角、間距等不需要縮放的尺寸 |
| `rem` | 根元素 `<html>` 字體大小的倍數，預設 1rem = 16px | 字體大小。使用者調整瀏覽器字體大小時會跟著變 |
| `em` | **這個元素自己**字體大小的倍數 | 字距（`letter-spacing`），讓它跟著字體大小等比例變化 |
| `%` | 父元素尺寸的百分比 | `width: 100%` 填滿父元素 |
| `vw` / `vh` | 視窗寬度 / 高度的 1% | 隨視窗大小變化的標題字體、側欄最大高度 |
| `fr` | Grid 裡「剩餘空間」的份數 | 中間欄位吃掉剩下的寬度 |

另外，整份 CSS 的間距幾乎都是 **4 的倍數**（4、8、12、16、24、32、48）。用固定的一組數字，畫面的留白看起來會比較整齊一致。

---

## 1. 顏色與共用設定（`:root`）

```css
:root {
  --bg: #f4f5f7;
  --surface: #ffffff;
  ...
}
```

`:root` 就是 `<html>` 元素。在這裡用 `--名稱` 定義的是 **CSS 變數**，整份 CSS 都可以用 `var(--名稱)` 讀取。好處是顏色集中管理：要換主題色，只要改這裡一行。

| 變數與值 | 用在哪裡 | 理由 |
|---|---|---|
| `--bg: #f4f5f7` | 整個頁面的背景 | 很淺的灰色，讓白色的卡片可以從背景中浮出來 |
| `--surface: #ffffff` | 卡片、側欄、表單的背景 | 內容區塊用白色，跟背景做出區隔 |
| `--surface-muted: #eef0f3` | 次要的底色：資訊標籤、切換鈕底座、無海報的佔位框、語言捲動區 | 比 `--surface` 暗一點，用來表示「這是一個區塊裡的子區塊」 |
| `--border: #dde1e7` | Genre / Language 按鈕的邊框 | 淺灰色，看得出邊界但不搶眼 |
| `--text: #1b1f27` | 主要文字 | 接近黑色但不是純黑。純黑配純白對比太強，長時間閱讀容易累 |
| `--text-muted: #5b6474` | 次要文字：副標題、小標籤、說明文字 | 灰色降低存在感。在白底上對比度約 6:1，符合無障礙標準 WCAG AA 要求的 4.5:1 |
| `--accent: rgb(16, 93, 176)` | 主色：Next 按鈕、選取中的 Movie/TV、焦點外框 | 沿用你原本選的藍色。白字在上面的對比度約 6.5:1 |
| `--accent-hover: rgb(12, 74, 141)` | 主色按鈕滑鼠移上去時 | 比主色暗一點，讓使用者知道「這可以點」 |
| `--danger: #c0392b` | 跟「排除」有關的紅色 | 紅色通常代表移除、禁止 |
| `--danger-soft: #fbeaea` | 已排除標籤的淺紅底色 | 搭配 `--danger` 的紅字，對比度約 4.7:1 |
| `--radius: 12px` | 卡片的圓角 | 所有大區塊用同一個圓角，看起來才像同一套設計 |
| `--shadow: 0 1px 2px …, 0 4px 12px …` | 卡片的陰影 | 兩層陰影：一層小而清楚（貼近邊緣），一層大而模糊（營造浮起感），比單層陰影自然 |

---

## 2. 全域基本設定

### `*`

```css
* {
  box-sizing: border-box;
}
```

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `box-sizing: border-box` | 讓 `width` 和 `height` **包含** padding 和 border | 預設的 `content-box` 不包含，`width: 100%` 再加 padding 就會超出父元素。改成 `border-box` 後，設多寬就是多寬，計算比較直覺 |

### `body`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `margin: 0` | 拿掉瀏覽器預設的 8px 外距 | 不然頁面四周會有一圈莫名的白邊 |
| `font-family: Inter, Avenir, Helvetica, Arial, sans-serif` | 指定字型，由左到右依序嘗試 | 第一個字型沒有安裝就用下一個，最後的 `sans-serif` 是保底。設在 `body` 上，裡面的元素都會繼承 |
| `line-height: 1.5` | 行高是字體大小的 1.5 倍 | 1.5 是一般內文最舒適的行距。**不加單位**，子元素會用自己的字體大小重新計算（例如 16.8px 的字 → 25.2px 的行高） |
| `color: var(--text)` | 預設文字顏色 | 所有文字的起點，個別需要的地方再覆蓋 |
| `background: var(--bg)` | 頁面背景色 | 淺灰底，讓白色卡片更明顯 |

### `ul`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `list-style: none` | 拿掉項目符號（•） | 這個 App 的 `<ul>` 都是拿來排按鈕和卡片的，不需要符號 |
| `margin: 0` | 拿掉預設的上下外距 | 間距改由各自的 class 控制 |
| `padding: 0` | 拿掉預設 40px 的左側內距 | 那是為了留位置給項目符號的，符號拿掉後就用不到了 |

### `img`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `display: block` | 把圖片從行內元素改成區塊元素 | 圖片預設是行內元素，下方會多出幾 px 的空隙（留給英文字母 g、y 的下半部用的），改成 block 就沒有了 |
| `max-width: 100%` | 圖片不會比父元素寬 | 容器變窄時圖片會自動縮小，不會撐破版面 |
| `height: auto` | 高度依照比例自動計算 | 寬度被縮小時，高度跟著等比例縮小，圖片不會變形 |

---

## 3. 按鈕

### `button`

```css
button {
  font: inherit;
  color: inherit;
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s, border-color 0.15s, transform 0.15s;
}
```

這段是把瀏覽器預設的按鈕樣式清空，各種按鈕（Next、Genre 標籤、已排除標籤）再各自設定外觀。

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `font: inherit` | 字型、大小、粗細都跟外層一樣 | 按鈕預設**不會**繼承字型，會用系統字型、約 13px，跟頁面其他文字不一致 |
| `color: inherit` | 文字顏色跟外層一樣 | 理由同上 |
| `background: none` | 拿掉預設的灰色背景 | 從空白開始，各種按鈕自己決定背景 |
| `border: 0` | 拿掉預設的邊框 | 同上 |
| `padding: 0` | 拿掉預設的內距 | 同上 |
| `cursor: pointer` | 滑鼠移上去時變成手指 | 讓使用者知道這可以點 |
| `transition: …0.15s` | 列出的屬性改變時，用 0.15 秒平滑過渡 | hover 時顏色和位置漸變，比瞬間切換自然。只列出會變化的屬性，而不是寫 `all`，避免把不想要的東西也加上動畫 |

> 原本用的是 `all: unset`。它會把**所有**屬性都清掉，包括 `box-sizing`（變回 `content-box`）和鍵盤焦點的外框，所以改成只清掉需要清的屬性。

### `button:focus-visible`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `outline: 2px solid var(--accent)` | 用鍵盤（Tab）選到按鈕時，顯示藍色外框 | 鍵盤使用者需要知道目前停在哪裡。`:focus-visible` 只在鍵盤操作時出現，用滑鼠點擊時不會出現 |
| `outline-offset: 2px` | 外框跟按鈕之間留 2px 空隙 | 外框不會貼在按鈕邊緣，看得比較清楚 |

---

## 4. 頁面標題

### `.app-header`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `padding: 32px 16px 24px` | 上 32px、左右 16px、下 24px | 標題上方留多一點空間，下方跟內容之間少一點，讓標題跟下面的內容在視覺上比較連貫 |
| `text-align: center` | 文字置中 | 頁面標題通常置中 |

### `.app-header h1`（主標題）

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `margin: 0` | 拿掉 `<h1>` 預設的上下外距 | 留白統一由 `.app-header` 的 padding 控制 |
| `font-size: clamp(2rem, 4vw, 2.75rem)` | 字體大小是視窗寬度的 4%，但最小 32px、最大 44px | 手機上不會太大而擠成兩行，大螢幕上也不會大得誇張，中間的尺寸會平滑變化，不需要寫 media query |
| `letter-spacing: -0.02em` | 字距縮小字體大小的 2% | 大字的字母間空隙看起來會偏鬆，稍微縮小會比較緊湊。用 `em` 是為了讓字距跟著字體大小一起變 |

### `.app-header h2`（副標題）

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `margin: 8px 0 0` | 上 8px，左右和下方 0 | 跟主標題保持一小段距離，其他預設外距拿掉 |
| `font-size: 1.05rem` | 約 16.8px | 比內文大一點點就好。`<h2>` 預設 24px，太大會跟主標題搶焦點 |
| `font-weight: 400` | 一般粗細 | `<h2>` 預設是粗體，改成一般粗細來拉開跟主標題的層級 |
| `color: var(--text-muted)` | 灰色 | 主標題大、粗、黑，副標題小、細、灰，一眼就看得出主次 |

---

## 5. 三欄排版

### `.main-container`

```css
.main-container {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr) 240px;
  grid-template-areas: "left center right";
  ...
}
```

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `display: grid` | 用 CSS Grid 排版 | 三欄這種「同時控制欄寬和位置」的排版，Grid 比 Flexbox 直覺。之後要在不同螢幕寬度下調換位置也很容易 |
| `grid-template-columns: 240px minmax(0, 1fr) 240px` | 左右兩欄固定 240px，中間吃掉剩下的空間 | 側欄內容的寬度固定就好，主要內容需要最多空間。中間用 `minmax(0, 1fr)` 而不是 `1fr`，原因見下方說明 |
| `grid-template-areas: "left center right"` | 幫三個欄位取名字 | 子元素用 `grid-area` 指定要放進哪一格。之後在 media query 裡只要改這一行，就能調換位置，不用改 HTML |
| `gap: 24px` | 欄與欄之間的間距 | 比 margin 好用，不會在最外側多出空白 |
| `align-items: start` | 每一欄的高度依照自己的內容決定 | 預設的 `stretch` 會把三欄拉成一樣高。這樣側欄就跟整個容器一樣高，`position: sticky` 就沒有空間可以「黏住」了 |
| `max-width: 1320px` | 最寬 1320px | 在超寬螢幕上，內容不會被拉到很寬，一行字太長會很難閱讀 |
| `margin: 0 auto` | 左右外距自動平分 | 容器寬度有上限之後，用這個讓它在頁面上置中 |
| `padding: 0 24px 48px` | 左右 24px、下方 48px | 左右不貼齊螢幕邊緣，底部多留一點空間，捲到最下面時不會太擠 |

> **為什麼是 `minmax(0, 1fr)`？**
> `1fr` 其實等於 `minmax(auto, 1fr)`，最小值 `auto` 代表「不能比內容的最小寬度還窄」。如果中間欄裡有很長、不能換行的內容，它就會把欄位撐開，把右側欄擠出畫面。把最小值改成 `0`，欄位就可以縮小，內容只會在欄位裡換行。

### `.sidebar.left` / `.center` / `.sidebar.right`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `grid-area: left` / `center` / `right` | 把元素放進對應名字的格子 | 搭配上面的 `grid-template-areas`。`.sidebar.left` 這種寫法代表「同時有 `sidebar` 和 `left` 兩個 class 的元素」 |

---

## 6. 側欄

### `.sidebar`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `position: sticky` | 捲動頁面時，側欄會停在畫面上 | 往下捲到篩選表單時，歷史紀錄和已排除清單還是看得到 |
| `top: 16px` | 黏住的位置是距離視窗頂端 16px | 不會緊貼著視窗邊緣 |
| `max-height: calc(100vh - 32px)` | 最高是視窗高度減 32px | 上下各留 16px。側欄比視窗還高的話，黏住之後下半部會永遠看不到 |
| `overflow-y: auto` | 內容超過最大高度時，側欄裡出現捲軸 | 搭配上一行，歷史紀錄很多時可以在側欄裡捲動 |
| `padding: 16px` | 內距 | 內容不會貼著卡片邊緣 |
| `background: var(--surface)` | 白色背景 | 跟其他卡片一致 |
| `border-radius: var(--radius)` | 圓角 | 同上 |
| `box-shadow: var(--shadow)` | 陰影 | 同上 |

### `.sidebar:empty`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `display: none` | 側欄裡什麼都沒有時就隱藏 | 歷史紀錄是空的時候，History 元件不會 render 任何東西。沒有這行的話，左邊會出現一個空白的卡片 |

### `.sidebar h4`（側欄標題，例如 "History:"）

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `margin: 0 0 12px` | 只留下方 12px | 上方已經有 `.sidebar` 的 padding，不需要再加 |
| `font-size: 1rem` | 16px | 側欄空間小，標題不需要太大 |

### `.sidebar h5`（小分類標題，例如 "Banned Genres:"）

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `margin: 16px 0 8px` | 上 16px、下 8px | 跟上一組隔開，跟自己下面的內容靠近，看得出它屬於哪一組 |
| `font-size: 0.75rem` | 12px | 小標籤的風格 |
| `font-weight: 600` | 半粗體 | 字很小，加粗一點比較好讀 |
| `letter-spacing: 0.06em` | 字距加寬 | 全大寫的小字，字母擠在一起不好讀，加寬字距會清楚很多 |
| `text-transform: uppercase` | 轉成全大寫 | 跟表單的 legend、資訊卡的 "OVERVIEW" 使用同一種小標籤風格 |
| `color: var(--text-muted)` | 灰色 | 小標籤是輔助資訊，不搶焦點 |

---

## 7. 歷史紀錄卡片

### `.history-list`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `display: grid` | 用 Grid 排列卡片 | 卡片大小一致時，Grid 排起來最整齊 |
| `grid-template-columns: repeat(auto-fill, minmax(90px, 1fr))` | 每欄最小 90px，空間塞得下幾欄就排幾欄，剩餘空間平均分配 | 不用寫死欄數。側欄寬 240px 時會排兩欄，移到下方變寬之後會自動變成好幾欄 |
| `gap: 12px` | 卡片之間的間距 | 縮圖之間要有空隙才不會黏在一起 |

### `.card`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `font-size: 0.8rem` | 約 12.8px | 縮圖下面的片名用小字就好 |

### `.card img`, `.card .no-poster`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `width: 100%` | 填滿卡片寬度 | 卡片寬度由 Grid 決定，圖片跟著卡片走 |
| `aspect-ratio: 2 / 3` | 固定寬高比 2:3 | TMDB 的海報就是 2:3。固定比例後，每張卡片都一樣大，圖片還沒載入時框也先佔好位置，版面不會跳動 |
| `object-fit: cover` | 圖片比例不同時，裁切邊緣來填滿框 | 少數海報比例不是 2:3，用 `cover` 就不會被壓扁或拉長 |
| `border-radius: 6px` | 圓角 | 比大卡片的 12px 小，小元素配小圓角比較協調 |

`.no-poster`（沒有海報的佔位框）也套用同樣的設定，所以沒有海報的卡片也會跟其他卡片一樣大。

### `.card p`（片名）

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `margin: 6px 0 0` | 只留上方 6px | 跟海報稍微隔開 |
| `line-height: 1.3` | 行高比內文緊 | 小字的片名如果換行，1.5 倍會顯得太鬆散 |
| `display: -webkit-box` | 搭配下面三行，限制最多顯示 2 行 | 這是限制行數的標準寫法，雖然有 `-webkit-` 前綴，但所有主流瀏覽器都支援 |
| `-webkit-line-clamp: 2` / `line-clamp: 2` | 最多 2 行，超過的部分顯示 `…` | 片名很長時不會把卡片撐得很高，所有卡片保持整齊。兩種寫法都寫，是為了相容舊的和新的標準 |
| `-webkit-box-orient: vertical` | 讓內容垂直排列 | `line-clamp` 需要這個設定才會生效 |
| `overflow: hidden` | 超出的部分隱藏 | 同上 |

---

## 8. 已排除清單（右側欄的紅色標籤）

### `.chip-list`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `display: flex` | 標籤橫向排列 | 標籤寬度依文字長短而不同，Flexbox 比 Grid 適合 |
| `flex-wrap: wrap` | 放不下就換行 | 預設不換行，標籤多了會超出側欄 |
| `gap: 8px` | 標籤之間的間距 | |

### `.chip-list button`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `display: inline-flex` | 按鈕內部用 Flexbox 排列 | 讓文字和後面的 ✕ 可以垂直置中、保持間距 |
| `align-items: center` | 內容垂直置中 | 文字和 ✕ 的大小不同，置中才會對齊 |
| `gap: 6px` | 文字和 ✕ 之間的距離 | |
| `padding: 4px 10px` | 上下 4px、左右 10px | 左右多一點，看起來是橫向的膠囊形狀 |
| `border-radius: 999px` | 圓角大到變成膠囊形 | 只要圓角大於高度的一半，兩端就會是完整的半圓。寫 999px 可以確保不管多高都是膠囊形 |
| `font-size: 0.85rem` | 約 13.6px | 側欄裡的標籤用小一點的字 |
| `color: var(--danger)` | 紅字 | 表示「這是被排除的」 |
| `background: var(--danger-soft)` | 淺紅底 | 同上 |

### `.chip-list button::after`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `content: "✕" / ""` | 在文字後面加上 ✕ | 提示「點了會移除」。斜線後面的 `""` 是給螢幕閱讀器的替代文字，設成空字串，它就不會把 ✕ 念成「乘號」 |
| `font-size: 0.75em` | ✕ 比文字小一點 | 只是輔助符號，不需要跟文字一樣大 |

### `.chip-list button:hover`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `color: #fff` | 滑鼠移上去時變白字 | 跟下一行搭配，顏色反轉，提示「點下去就會移除」 |
| `background: var(--danger)` | 變成深紅底 | 同上 |

---

## 9. 中間的資訊卡

### `.info-container`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `display: grid` | 用 Grid 排版 | 海報和文字左右並排 |
| `grid-template-columns: 200px minmax(0, 1fr)` | 海報固定 200px，文字吃掉剩下的空間 | 海報有固定大小比較好看，文字需要的空間比較多。`minmax(0, 1fr)` 的理由跟三欄排版一樣 |
| `gap: 24px` | 海報和文字之間的距離 | |
| `padding: 24px` | 內距 | |
| `background` / `border-radius` / `box-shadow` | 白底、圓角、陰影 | 跟其他卡片一致 |

### `.poster`, `.info-container > .no-poster`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `width: 100%` | 填滿 200px 的欄位 | |
| `aspect-ratio: 2 / 3` | 固定 2:3 | 跟歷史紀錄卡片相同的理由 |
| `object-fit: cover` | 裁切填滿 | 同上 |
| `border-radius: 8px` | 圓角 | 介於大卡片（12px）和小縮圖（6px）之間 |

`>` 是「直接子元素」選擇器，只選取 `.info-container` 的下一層 `.no-poster`，不會影響到別的地方。

### `.no-poster`（沒有海報時的灰色佔位框）

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `display: grid` | 用 Grid | 搭配下一行，是最簡單的置中寫法 |
| `place-items: center` | 內容水平和垂直都置中 | 「No Image」文字會在框的正中間 |
| `padding: 8px` | 內距 | 文字比較長時，不會貼到邊緣 |
| `font-size: 0.8rem` | 小字 | 只是提示文字 |
| `text-align: center` | 文字置中 | 換行時每一行也都置中 |
| `color: var(--text-muted)` | 灰字 | 提示性質的文字 |
| `background: var(--surface-muted)` | 灰底 | 讓人看得出「這裡本來應該有一張圖」 |

### `.info-details h3`（片名）

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `margin: 0 0 12px` | 只留下方 12px | 上方對齊海報頂端 |
| `font-size: 1.75rem` | 28px | 卡片裡最重要的資訊，要夠大 |
| `line-height: 1.2` | 行高比內文緊 | 大字用 1.5 倍行高，換行時兩行會隔得太開。標題一般用 1.1 到 1.3 |

### `.info-meta`（語言、日期、評分這一排）

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `display: flex` | 橫向排列 | 三個小標籤放在同一排 |
| `flex-wrap: wrap` | 放不下就換行 | 視窗窄的時候不會超出 |
| `gap: 8px` | 間距 | |
| `margin-bottom: 20px` | 跟下方的 Overview 隔開 | |

### `.info-meta p`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `margin: 0` | 拿掉 `<p>` 預設的上下外距 | 間距改由 `gap` 控制 |
| `padding: 4px 10px` | 內距 | 做成小標籤的樣子 |
| `font-size: 0.85rem` | 小字 | 輔助資訊 |
| `color: var(--text-muted)` | 灰字 | 同上 |
| `background: var(--surface-muted)` | 灰底 | 讓它看起來像標籤，而不是一般文字 |
| `border-radius: 999px` | 膠囊形 | 跟其他標籤一致 |

### `.info-details h4`（"OVERVIEW" 小標題）

跟 `.sidebar h5` 和表單的 `legend` 是**同一種小標籤風格**（12px、半粗體、全大寫、加寬字距、灰色）。同一種用途的元素用同一種樣式，使用者會自然把它們理解成「同一類的東西」。

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `margin: 0 0 6px` | 只留下方 6px | 跟下面的內文靠近，看得出是它的標題 |
| 其他五個屬性 | 同 `.sidebar h5` | 同上 |

### `.overview`（劇情簡介）

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `margin: 0` | 拿掉預設外距 | |
| `line-height: 1.6` | 比一般內文再寬一點 | 劇情簡介常常是一大段，行距寬一點比較好讀 |

### `.status`（"Sorry, something went wrong." 訊息）

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `margin: 0` | 拿掉 `<p>` 預設外距 | |
| `padding: 48px 24px` | 上下留比較多空間 | 讓它有一定的高度，看起來像一個區塊，而不是一行孤零零的字 |
| `text-align: center` | 置中 | 狀態訊息通常置中 |
| `color: var(--text-muted)` | 灰字 | |
| `background` / `border-radius` / `box-shadow` | 跟資訊卡一樣的卡片外觀 | 資料載入前後，這個位置都是一張卡片，版面不會突然變形 |

---

## 10. Next 按鈕（`#next-button`）

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `display: block` | 區塊元素 | 搭配下一行才能填滿寬度 |
| `width: 100%` | 跟資訊卡一樣寬 | 這是頁面上最主要的操作，做大一點，好找也好點 |
| `margin: 16px 0 24px` | 上 16px、下 24px | 跟資訊卡靠近（因為它控制的是資訊卡），跟下面的表單隔遠一點 |
| `padding: 14px 20px` | 內距 | 按鈕高度大約 50px，手機上也很好按 |
| `font-size: 1rem` | 16px | |
| `font-weight: 600` | 半粗體 | 主要按鈕的文字要清楚 |
| `color: #fff` | 白字 | 在藍底上清楚 |
| `background: var(--accent)` | 主色藍底 | 整個頁面最顯眼的顏色，用在最重要的按鈕上 |
| `border-radius: var(--radius)` | 跟卡片一樣的圓角 | 跟上下的卡片對齊，看起來是同一組 |
| `box-shadow: 0 2px 0 rgba(0, 0, 0, 0.2)` | 正下方一條不模糊的陰影 | 讓按鈕有一點「可以按下去」的立體感。沿用你原本按鈕的風格 |

### `#next-button:hover`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `background: var(--accent-hover)` | 變深藍 | hover 的回饋 |
| `transform: translateY(-1px)` | 往上浮 1px | 搭配陰影，看起來像是浮起來、準備被按下去 |

### `#next-button:active`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `transform: translateY(0)` | 按下時回到原位 | 有「按下去」的手感 |

---

## 11. 篩選表單

### `.form`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `padding: 20px 24px 24px` | 上 20px、左右 24px、下 24px | 上方的標題本身有行高，所以上方留少一點，視覺上四邊的留白看起來會差不多 |
| `background` / `border-radius` / `box-shadow` | 卡片外觀 | 跟其他卡片一致 |

### `.form h3`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `margin: 0 0 16px` | 只留下方 16px | |
| `font-size: 1.1rem` | 約 17.6px | 表單標題不需要比片名大 |

### `.form-group + .form-group`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `margin-top: 20px` | 每一組之間隔 20px | `+` 是「緊接在後的兄弟元素」選擇器，意思是「前面還有一個 `.form-group` 的 `.form-group`」。所以只有第二組以後才有上方間距，第一組上面不會多出空白 |

### `fieldset`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `min-width: 0` | 取消預設的最小寬度 | 瀏覽器預設 fieldset 不能比內容窄。之前 187 個語言按鈕排成一行時，就是它把整個頁面撐破的 |
| `margin: 0` | 拿掉預設外距 | |
| `padding: 0` | 拿掉預設內距 | |
| `border: 0` | 拿掉預設的框線 | 預設的框線很老派，改用卡片和小標籤來分組 |

### `legend`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `float: left` | 讓 legend 浮動 | legend 預設會被畫在 fieldset 的框線**上面**，`margin` 也常常不照預期運作。讓它浮動，它就會變成一般的區塊，`margin-bottom` 才會生效 |
| `width: 100%` | 寬度填滿 | 浮動的元素寬度預設只有內容那麼寬，填滿後下一個元素才不會擠到它旁邊 |
| `margin-bottom: 10px` | 跟下面的按鈕隔開 | |
| `padding: 0` | 拿掉預設的左右 2px 內距 | 讓 legend 的文字跟下面的內容左側對齊 |
| 其他五個屬性 | 同 `.sidebar h5` 的小標籤風格 | |

### `legend + *`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `clear: both` | legend 後面的元素從新的一行開始 | 前面有浮動元素時，後面的元素可能會排到它旁邊。`clear` 讓它排在浮動元素的下方 |

---

## 12. Movie / TV 切換鈕

這是把兩個 radio 做成「一個按鈕組、選中的那個變藍」的樣子，常被叫做 segmented control。

### `.segmented`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `position: relative` | 成為定位基準 | 裡面的 radio 用 `position: absolute` 隱藏，需要一個基準點，不然它會跑到頁面上奇怪的位置 |
| `display: inline-flex` | 寬度只跟內容一樣寬 | 用 `flex` 的話會填滿整行，兩個選項會被拉得很開 |
| `gap: 4px` | 兩個選項之間的距離 | |
| `padding: 4px` | 底座和選項之間的距離 | 選中的藍色膠囊周圍會留一圈灰色底座 |
| `background: var(--surface-muted)` | 灰色底座 | 讓兩個選項看起來是同一組 |
| `border-radius: 999px` | 膠囊形 | |

### `.segmented input`（真正的 radio）

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `position: absolute` | 脫離排版 | 不佔空間 |
| `width: 1px` / `height: 1px` | 縮到最小 | |
| `opacity: 0` | 完全透明 | 看不見 |
| `pointer-events: none` | 不接收滑鼠事件 | 點擊交給 label 處理 |

> **為什麼不用 `display: none`？**
> `display: none` 會讓元素完全消失，鍵盤用 Tab 選不到，螢幕閱讀器也讀不到。用上面這種方式，畫面上看不見，但它仍然存在：鍵盤可以操作（Tab 選到後用方向鍵切換），螢幕閱讀器也知道這是一組 radio。

### `.segmented label`（看得到的那兩個選項）

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `padding: 6px 18px` | 內距 | 讓選項有按鈕的大小 |
| `font-weight: 500` | 稍微加粗 | |
| `color: var(--text-muted)` | 沒選中時是灰字 | 跟選中的白字藍底做出對比 |
| `border-radius: 999px` | 膠囊形 | |
| `cursor: pointer` | 手指游標 | 提示可以點。點 label 就等於點了 `htmlFor` 對應的 radio |

### `.segmented input:checked + label`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `color: #fff` | 白字 | 選中的狀態 |
| `background: var(--accent)` | 藍底 | 同上 |

這個選擇器的意思是「**緊接在**被選中的 input **後面**的那個 label」。CSS 只能選取後面的兄弟元素，不能選前面的，所以 JSX 裡 input 一定要寫在 label **前面**。

### `.segmented input:focus-visible + label`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `outline: 2px solid var(--accent)` | 鍵盤選到時，在 label 上顯示外框 | radio 本身看不見，所以焦點外框要畫在看得見的 label 上 |
| `outline-offset: 2px` | 外框留一點空隙 | |

---

## 13. Genre / Language 按鈕

### `.button-group`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `display: flex` | 橫向排列 | 按鈕寬度依文字長短而不同 |
| `flex-wrap: wrap` | 放不下就換行 | **非常重要**：沒有這行，所有按鈕會排成一行超出畫面 |
| `gap: 8px` | 按鈕之間的距離 | |

### `.button-group button`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `display: inline-flex` | 內部用 Flexbox | |
| `align-items: center` | 文字垂直置中 | |
| `padding: 6px 12px` | 內距 | 比右側欄的紅色標籤大一點，這裡是主要的操作區 |
| `font-size: 0.875rem` | 14px | |
| `background: var(--surface)` | 白底 | |
| `border: 1px solid var(--border)` | 淺灰邊框 | 白底按鈕放在白色卡片上，需要邊框才看得出範圍 |
| `border-radius: 999px` | 膠囊形 | |

### `.button-group button:hover`

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `color: var(--danger)` | 紅字 | 滑鼠移上去就**預告**點了會發生什麼事：這個類型會被排除 |
| `border-color: var(--danger)` | 紅框 | 同上 |
| `text-decoration: line-through` | 刪除線 | 同上，刪除線很直覺地表示「拿掉」 |

### `.scroll-box`（只有 Language 那組有）

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `max-height: 220px` | 最高 220px | 語言將近 200 個，全部攤開會變成一大面牆，把下面的內容推得很遠 |
| `overflow-y: auto` | 超過高度就捲動 | 搭配上一行 |
| `padding: 10px` | 內距 | 有了 `overflow`，超出範圍的東西都會被裁掉。留一點內距，按鈕的焦點外框才不會被切掉 |
| `background: var(--surface-muted)` | 灰底 | 讓人看得出「這是一個可以捲動的區域」 |
| `border-radius: 8px` | 圓角 | |

---

## 14. 響應式設計

`@media (max-width: …)` 的意思是「**視窗寬度小於等於**這個值時，套用裡面的規則」。

這份 CSS 是**先寫桌面版**，再用 `max-width` 往小螢幕調整。另一種常見做法是先寫手機版，再用 `min-width` 往大螢幕擴充，兩種都可以。

### `@media (max-width: 1100px)`：平板、小筆電

| 選擇器與屬性 | 作用 | 理由 |
|---|---|---|
| `.main-container { grid-template-columns: minmax(0, 1fr) 240px }` | 改成兩欄：內容 + 右側欄 | 1100px 以下放三欄，中間會太擠 |
| `.main-container { grid-template-areas: "center right" "left left" }` | 第一排放內容和右側欄，第二排讓歷史紀錄橫跨兩欄 | 已排除清單跟篩選操作有直接關係，所以留在旁邊。歷史紀錄沒那麼急著要看，移到下面 |
| `.sidebar.left { position: static }` | 歷史紀錄不再黏住 | 它已經在頁面最下方、橫跨整個寬度，黏住會擋住其他內容 |
| `.sidebar.left { max-height: none }` | 取消最大高度 | 讓歷史紀錄完整攤開，不需要在小框框裡捲動 |
| `.history-list { grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)) }` | 縮圖最小寬度改成 110px | 空間變寬了，縮圖可以大一點 |

### `@media (max-width: 720px)`：手機

| 選擇器與屬性 | 作用 | 理由 |
|---|---|---|
| `.main-container { grid-template-columns: minmax(0, 1fr) }` | 改成一欄 | 手機寬度只放得下一欄 |
| `.main-container { grid-template-areas: "center" "right" "left" }` | 由上到下：內容 → 已排除 → 歷史紀錄 | 最重要的放最上面 |
| `.main-container { padding: 0 16px 32px }` | 左右內距縮小成 16px | 手機螢幕窄，每一 px 都很珍貴 |
| `.sidebar { position: static; max-height: none }` | 兩個側欄都不黏住、不限高度 | 一欄的排版下，黏住的側欄會蓋住下面的內容 |
| `.info-container { grid-template-columns: 1fr }` | 資訊卡改成一欄，海報在上、文字在下 | 左右並排的話，文字只剩很窄的一條 |
| `.poster, .info-container > .no-poster { max-width: 220px; margin: 0 auto }` | 海報最寬 220px，並且置中 | 一欄的時候，海報如果填滿整個寬度會非常大 |

---

## 15. 減少動畫

```css
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
  }
}
```

| 屬性與值 | 作用 | 理由 |
|---|---|---|
| `transition: none !important` | 使用者在系統設定裡開啟「減少動態效果」時，取消所有過渡動畫 | 有些人看到畫面移動會頭暈或不舒服。`!important` 確保它會蓋過其他所有地方設定的 `transition` |
