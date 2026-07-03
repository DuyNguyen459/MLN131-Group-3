# Hành trình Pháp quyền

Website demo học thuật cho MLN131 - Nhóm 3 về Dân chủ XHCN và Nhà nước pháp quyền XHCN Việt Nam. Giao diện được thiết kế như một sản phẩm civic-tech trình chiếu trước lớp: sáng, hiện đại, có tương tác và có kiểm chứng học thuật.

## Tính năng chính

- Hero “Hành trình Pháp quyền” với hub Trống đồng Đông Sơn, node điều hướng và animation radial có thể bấm để đi tới từng phần.
- Section Đảng lãnh đạo theo Điều 4 Hiến pháp 2013 và Nghị quyết 27-NQ/TW có accordion nội dung thật.
- Module bộ máy nhà nước: Quốc hội, Chính phủ, Tòa án & Viện kiểm sát; có tab cấu trúc, luồng vận hành và ghi chú kiểm chứng.
- Cổng tiếp nhận ý kiến Nhân dân có quy trình thật trên frontend: gửi ý kiến, chuyển trạng thái, lưu timeline xử lý.
- Minigame “Thử tài phân loại thẩm quyền” chạy ở cửa sổ riêng qua `?game=1`, random 20 câu từ ngân hàng 50 câu.
- Leaderboard và Error Analytics Dashboard lấy dữ liệu từ lượt chơi đã ghi nhận trong Supabase DB khi deploy, không dùng dữ liệu mẫu.
- AI Transparency Hub: bảng AI Suggestion vs Human Verification và badge minh bạch học thuật.

## Cách chạy

```bash
npm install
npm run dev
```

Mở địa chỉ Vite hiển thị trong terminal, thường là:

```text
http://localhost:5173
```

Build production:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

Nếu PowerShell chặn `npm.ps1`, dùng `npm.cmd`:

```bash
npm.cmd run dev
npm.cmd run build
npm.cmd run lint
```

## Flow thuyết trình

1. Khởi động hệ thống ở hero, bấm CTA để Trống đồng bung node điều hướng.
2. Đi qua vai trò Đảng lãnh đạo và nguyên tắc không làm thay Nhà nước.
3. Trình bày ba nhóm quyền lực bằng tab: lập pháp, hành pháp, tư pháp.
4. Chuyển sang cổng ý kiến Nhân dân để giải thích dân chủ, tiếp thu và giải trình.
5. Chạy minigame kiểm tra thẩm quyền qua 3 tình huống.
6. Kết thúc bằng dashboard lỗi sai và AI Transparency Hub.

## Cách dùng minigame

Trong section Trò chơi, bấm “Mở game” hoặc quét QR để mở cửa sổ riêng:

```text
http://localhost:5173/?game=1
```

Người chơi nhập tên và trả lời 20 câu được random từ ngân hàng 50 câu. Mỗi câu đúng được 1 điểm. Bảng xếp hạng sắp theo điểm cao hơn trước, nếu bằng điểm thì thời gian ngắn hơn đứng trước. Nút `Clear` trong host screen dùng để xóa bảng xếp hạng trước khi thuyết trình.

## Realtime DB khi deploy

App dùng Supabase làm nguồn lưu dữ liệu cho leaderboard và cổng ý kiến. Tạo file `.env.local` khi chạy máy cá nhân hoặc khai báo biến môi trường trên nền tảng deploy:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Tạo 2 bảng và policy demo trong Supabase SQL Editor:

```sql
create table if not exists hpq_players (
  id text primary key,
  name text not null,
  score integer not null,
  duration integer not null,
  wrong jsonb default '[]'::jsonb,
  at text
);

create table if not exists hpq_feedback (
  id text primary key,
  draft text not null,
  content text not null,
  status text not null,
  "createdAt" text,
  timeline jsonb default '[]'::jsonb
);

alter table hpq_players enable row level security;
alter table hpq_feedback enable row level security;

create policy "hpq players read" on hpq_players for select using (true);
create policy "hpq players insert" on hpq_players for insert with check (true);
create policy "hpq players update" on hpq_players for update using (true) with check (true);
create policy "hpq players delete" on hpq_players for delete using (true);

create policy "hpq feedback read" on hpq_feedback for select using (true);
create policy "hpq feedback insert" on hpq_feedback for insert with check (true);
create policy "hpq feedback update" on hpq_feedback for update using (true) with check (true);
create policy "hpq feedback delete" on hpq_feedback for delete using (true);
```

Lưu ý: các policy trên phù hợp cho buổi demo/lớp học công khai. Sau khi thuyết trình xong, nên khóa quyền `delete` hoặc đổi sang backend/API riêng nếu dùng lâu dài.
