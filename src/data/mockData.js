// ============================================================
// MOCK DATA — Hành trình Pháp quyền
// All Vietnamese dummy content for the SPA
// ============================================================

// --- Sidebar Navigation ---
export const sidebarSections = [
  {
    id: 'duong-loi',
    title: 'Đề ra đường lối',
    description: 'Đảng lãnh đạo thông qua chủ trương, đường lối, nghị quyết',
    icon: 'ScrollText',
  },
  {
    id: 'can-bo',
    title: 'Công tác cán bộ',
    description: 'Đào tạo, bồi dưỡng và quản lý đội ngũ cán bộ',
    icon: 'Users',
  },
];

export const nghiQuyetCard = {
  title: 'Nghị quyết số 27-NQ/TW',
  date: '09/11/2022',
  subtitle: 'Hội nghị lần thứ sáu BCH TW Đảng khóa XIII',
  content:
    'Về tiếp tục xây dựng và hoàn thiện Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam trong giai đoạn mới.',
  highlights: [
    'Hoàn thiện hệ thống pháp luật',
    'Cải cách tư pháp',
    'Kiểm soát quyền lực nhà nước',
    'Xây dựng nền hành chính hiện đại',
  ],
};

// --- Legislative Branch (Lập pháp) ---
export const legislativeOrgChart = {
  root: 'Quốc hội',
  children: [
    {
      name: 'Chủ tịch Quốc hội',
      children: [
        {
          name: 'Ủy ban Thường vụ Quốc hội',
          children: [
            { name: 'Hội đồng Dân tộc' },
            { name: 'Ủy ban Pháp luật' },
            { name: 'Ủy ban Tư pháp' },
            { name: 'Ủy ban Kinh tế' },
            { name: 'Ủy ban Tài chính - Ngân sách' },
            { name: 'Ủy ban QP & AN' },
            { name: 'Ủy ban VH, GD' },
            { name: 'Ủy ban XH' },
            { name: 'Ủy ban KH, CN & MT' },
            { name: 'Ủy ban Đối ngoại' },
          ],
        },
      ],
    },
    {
      name: '500 Đại biểu Quốc hội',
      children: [
        { name: 'Đại biểu chuyên trách (TW)' },
        { name: 'Đại biểu chuyên trách (ĐP)' },
        { name: 'Đại biểu kiêm nhiệm' },
      ],
    },
  ],
};

export const legislativeModal = {
  title: 'Phiên chất vấn Quốc hội khóa XV',
  description:
    'Phiên chất vấn và trả lời chất vấn tại Kỳ họp thứ 6, Quốc hội khóa XV. Đại biểu chất vấn các thành viên Chính phủ về những vấn đề nóng: quản lý đất đai, y tế, giáo dục, an ninh mạng.',
  stats: [
    { label: 'Đại biểu chất vấn', value: '152' },
    { label: 'Bộ trưởng trả lời', value: '4' },
    { label: 'Vấn đề được nêu', value: '287' },
    { label: 'Cam kết thực hiện', value: '45' },
  ],
};

// --- Executive Branch (Hành pháp) ---
export const executiveTree = [
  {
    name: 'Chính phủ',
    level: 0,
    children: [
      {
        name: 'Thủ tướng Chính phủ',
        level: 1,
        children: [
          { name: 'Bộ Tư pháp', level: 2 },
          { name: 'Bộ Công an', level: 2 },
          { name: 'Bộ Quốc phòng', level: 2 },
          { name: 'Bộ Tài chính', level: 2 },
          { name: 'Bộ GD & ĐT', level: 2 },
          { name: 'Bộ Y tế', level: 2 },
          { name: 'Bộ TT & TT', level: 2 },
        ],
      },
    ],
  },
  {
    name: 'UBND Tỉnh / TP',
    level: 1,
    children: [
      {
        name: 'UBND Quận / Huyện',
        level: 2,
        children: [{ name: 'UBND Phường / Xã', level: 3 }],
      },
    ],
  },
];

export const executiveCaseStudy = {
  title: 'Đề án 06 & Chuyển đổi số Quốc gia',
  subtitle: 'Quyết định 06/QĐ-TTg ngày 06/01/2022',
  description:
    'Phê duyệt Đề án phát triển ứng dụng dữ liệu về dân cư, định danh và xác thực điện tử phục vụ chuyển đổi số quốc gia giai đoạn 2022 - 2025, tầm nhìn đến năm 2030.',
  metrics: [
    { label: 'Định danh điện tử', value: '80 triệu', icon: 'Fingerprint' },
    { label: 'Dịch vụ công trực tuyến', value: '4.400+', icon: 'Globe' },
    { label: 'Tỉnh/TP triển khai', value: '63/63', icon: 'MapPin' },
    { label: 'Giao dịch/ngày', value: '1.2 triệu', icon: 'Activity' },
  ],
};

// --- Judiciary Branch (Tư pháp) ---
export const judiciaryTree = [
  {
    name: 'TAND Tối cao',
    children: [
      {
        name: 'TAND Cấp cao (3)',
        note: 'Hà Nội, Đà Nẵng, TP.HCM',
        children: [
          {
            name: 'TAND Tỉnh / TP (63)',
            children: [{ name: 'TAND Huyện / Quận' }],
          },
        ],
      },
      {
        name: 'Tòa chuyên trách',
        children: [
          { name: 'Tòa Hình sự' },
          { name: 'Tòa Dân sự' },
          { name: 'Tòa Hành chính' },
          { name: 'Tòa Kinh tế' },
          { name: 'Tòa Lao động' },
          { name: 'Tòa Gia đình & Người chưa thành niên' },
        ],
      },
    ],
  },
];

export const judiciaryCases = [
  {
    id: 1,
    title: 'Vụ án Vạn Thịnh Phát',
    year: '2024',
    type: 'Kinh tế - Tham nhũng',
    summary:
      'Xét xử vụ án liên quan đến Tập đoàn Vạn Thịnh Phát và Ngân hàng SCB. Thiệt hại ước tính hơn 498.000 tỷ đồng. Thể hiện quyết tâm xử lý tham nhũng không có vùng cấm.',
    verdict: 'Tử hình (sơ thẩm) → Chung thân (phúc thẩm)',
    significance: 'Vụ án kinh tế lớn nhất lịch sử tư pháp Việt Nam',
  },
  {
    id: 2,
    title: 'Vụ án "chuyến bay giải cứu"',
    year: '2024',
    type: 'Tham nhũng - Đưa/Nhận hối lộ',
    summary:
      'Liên quan đến 54 bị cáo, trong đó nhiều cựu quan chức cấp cao. Hành vi nhận hối lộ, lợi dụng chức vụ trong tổ chức chuyến bay giải cứu công dân trong đại dịch COVID-19.',
    verdict: 'Mức án từ 18 tháng tù treo đến tử hình',
    significance: 'Minh chứng nguyên tắc "không có vùng cấm, không có ngoại lệ"',
  },
  {
    id: 3,
    title: 'Vụ kit test Việt Á',
    year: '2024',
    type: 'Tham nhũng - Vi phạm đấu thầu',
    summary:
      'Vụ án liên quan đến Công ty Việt Á nâng khống giá kit test COVID-19, cấu kết với nhiều quan chức để trục lợi. Thiệt hại nghiêm trọng cho ngân sách nhà nước.',
    verdict: 'Mức án lên đến chung thân',
    significance: 'Thể hiện tính độc lập của tư pháp trong xử lý tham nhũng',
  },
];

// --- Public Feedback Portal ---
export const feedbackComments = [
  {
    id: 1,
    type: 'citizen',
    name: 'Nguyễn Văn Hùng',
    location: 'Hà Nội',
    time: '2 giờ trước',
    avatar: 'NVH',
    content:
      'Tôi đề nghị cần làm rõ hơn quy trình thu hồi đất trong Điều 79. Cần có cơ chế giám sát độc lập để đảm bảo quyền lợi người dân khi bị thu hồi đất nông nghiệp.',
  },
  {
    id: 2,
    type: 'government',
    name: 'Bộ Tài nguyên & Môi trường',
    location: '',
    time: '1 giờ trước',
    avatar: 'BT',
    content:
      'Tiếp thu ý kiến. Dự thảo sửa đổi đã bổ sung quy định về hội đồng thẩm định giá đất độc lập tại Điều 79, khoản 3. Cơ chế giám sát sẽ được cụ thể hóa tại Nghị định hướng dẫn.',
  },
  {
    id: 3,
    type: 'citizen',
    name: 'Trần Thị Mai',
    location: 'TP. Hồ Chí Minh',
    time: '3 giờ trước',
    avatar: 'TTM',
    content:
      'Về bảng giá đất (Điều 159), tôi kiến nghị cần cập nhật hàng năm theo giá thị trường thực tế, không nên để 5 năm/lần như trước. Điều này giúp giảm chênh lệch giá và hạn chế tham nhũng.',
  },
  {
    id: 4,
    type: 'government',
    name: 'Ủy ban Kinh tế Quốc hội',
    location: '',
    time: '2 giờ trước',
    avatar: 'UB',
    content:
      'Cảm ơn ý kiến đóng góp. Luật Đất đai sửa đổi 2024 đã quy định bảng giá đất được xây dựng hàng năm (Điều 159) và công bố công khai. Đây là bước tiến quan trọng so với quy định cũ.',
  },
  {
    id: 5,
    type: 'citizen',
    name: 'Lê Minh Đức',
    location: 'Đà Nẵng',
    time: '4 giờ trước',
    avatar: 'LMĐ',
    content:
      'Đề xuất tăng cường quyền của người sử dụng đất trong việc chuyển nhượng, thế chấp. Cần đơn giản hóa thủ tục hành chính, rút ngắn thời gian cấp giấy chứng nhận.',
  },
  {
    id: 6,
    type: 'citizen',
    name: 'Phạm Hồng Sơn',
    location: 'Hải Phòng',
    time: '5 giờ trước',
    avatar: 'PHS',
    content:
      'Tôi quan tâm đến chính sách đất đai cho đồng bào dân tộc thiểu số. Cần có cơ chế đặc thù để bảo vệ quyền sử dụng đất của bà con, tránh tình trạng mất đất canh tác.',
  },
  {
    id: 7,
    type: 'government',
    name: 'Ủy ban Dân tộc',
    location: '',
    time: '4 giờ trước',
    avatar: 'DT',
    content:
      'Ghi nhận ý kiến. Chương X của Luật Đất đai sửa đổi đã có các quy định riêng về chính sách đất đai đối với đồng bào dân tộc thiểu số, bao gồm quỹ đất và hỗ trợ sản xuất.',
  },
  {
    id: 8,
    type: 'citizen',
    name: 'Võ Thị Lan',
    location: 'Cần Thơ',
    time: '6 giờ trước',
    avatar: 'VTL',
    content:
      'Kiến nghị về quỹ phát triển đất: cần minh bạch nguồn thu, chi và có kiểm toán độc lập. Người dân cần được biết tiền từ đất đai được sử dụng vào mục đích gì.',
  },
  {
    id: 9,
    type: 'citizen',
    name: 'Đặng Văn Khánh',
    location: 'Nghệ An',
    time: '7 giờ trước',
    avatar: 'ĐVK',
    content:
      'Cần quy định rõ hơn về quyền và nghĩa vụ của người Việt Nam định cư ở nước ngoài trong sở hữu nhà ở gắn liền với quyền sử dụng đất tại Việt Nam.',
  },
  {
    id: 10,
    type: 'government',
    name: 'Bộ Xây dựng',
    location: '',
    time: '6 giờ trước',
    avatar: 'BX',
    content:
      'Luật Đất đai 2024 đã mở rộng quyền cho người Việt Nam định cư ở nước ngoài, bao gồm quyền sở hữu nhà ở thương mại. Chi tiết sẽ được hướng dẫn tại các văn bản dưới luật.',
  },
  {
    id: 11,
    type: 'citizen',
    name: 'Bùi Thị Hồng',
    location: 'Bắc Ninh',
    time: '8 giờ trước',
    avatar: 'BTH',
    content:
      'Ủng hộ quy định về đấu giá đất công khai, minh bạch. Đề nghị bổ sung chế tài mạnh hơn đối với hành vi thông đồng, dìm giá trong đấu giá đất.',
  },
  {
    id: 12,
    type: 'citizen',
    name: 'Hoàng Minh Tuấn',
    location: 'Quảng Ninh',
    time: '9 giờ trước',
    avatar: 'HMT',
    content:
      'Đề xuất xây dựng hệ thống thông tin đất đai quốc gia thống nhất, liên thông giữa các cấp. Hiện nay dữ liệu còn phân tán, gây khó khăn trong quản lý.',
  },
];

// --- Quiz Leaderboard ---
export const leaderboardData = [
  { rank: 1, name: 'Nguyễn Văn A', score: 95, time: '1:23', medal: '🥇' },
  { rank: 2, name: 'Trần Thị B', score: 90, time: '1:45', medal: '🥈' },
  { rank: 3, name: 'Lê Văn C', score: 85, time: '1:52', medal: '🥉' },
  { rank: 4, name: 'Phạm Minh D', score: 80, time: '1:58' },
  { rank: 5, name: 'Hoàng Thị E', score: 75, time: '2:00' },
];

// --- Error Analytics ---
export const errorAnalyticsData = [
  { question: 'Câu 1', errorRate: 15, label: 'Câu 1', topic: 'Nguyên tắc pháp quyền' },
  { question: 'Câu 2', errorRate: 65, label: 'Câu 2', topic: 'Quyền tuyên bố chiến tranh', isHighlighted: true },
  { question: 'Câu 3', errorRate: 22, label: 'Câu 3', topic: 'Nhiệm kỳ Quốc hội' },
  { question: 'Câu 4', errorRate: 38, label: 'Câu 4', topic: 'Cơ cấu Chính phủ' },
  { question: 'Câu 5', errorRate: 12, label: 'Câu 5', topic: 'Quyền công dân' },
  { question: 'Câu 6', errorRate: 28, label: 'Câu 6', topic: 'Hệ thống tòa án' },
  { question: 'Câu 7', errorRate: 8, label: 'Câu 7', topic: 'Hiến pháp 2013' },
  { question: 'Câu 8', errorRate: 45, label: 'Câu 8', topic: 'Phân quyền địa phương' },
];

export const errorAnnotation = {
  question: 'Câu hỏi số 2',
  errorRate: '65%',
  detail:
    '"Cơ quan nào có quyền tuyên bố tình trạng chiến tranh?"',
  wrongAnswer: 'Chính phủ',
  correctAnswer: 'Quốc hội',
  reference: 'Điều 70, khoản 14 — Hiến pháp 2013',
  explanation:
    '65% sinh viên chọn "Chính phủ" thay vì "Quốc hội". Đây là nhầm lẫn phổ biến giữa quyền lập pháp và hành pháp trong tuyên bố chiến tranh.',
};

// --- AI Transparency Hub ---
export const transparencyData = [
  {
    id: 1,
    aiPrompt: 'Tạo sơ đồ tổ chức bộ máy nhà nước Việt Nam theo Hiến pháp 2013',
    aiOutput: 'Sơ đồ 3 nhánh quyền lực: Lập pháp, Hành pháp, Tư pháp với các cơ quan tương ứng',
    humanVerification: 'Điều 2, Hiến pháp 2013: "Quyền lực nhà nước là thống nhất, có sự phân công, phối hợp, kiểm soát giữa các cơ quan..."',
    source: 'Hiến pháp 2013, Điều 2',
    status: 'verified',
  },
  {
    id: 2,
    aiPrompt: 'Giải thích nguyên tắc "Đảng lãnh đạo, Nhà nước quản lý, Nhân dân làm chủ"',
    aiOutput: 'Phân tích cơ chế tam giác quyền lực trong hệ thống chính trị Việt Nam',
    humanVerification: 'Giáo trình MLN131, Chương 8 (2021): Mối quan hệ giữa Đảng, Nhà nước và Nhân dân trong nền dân chủ XHCN',
    source: 'Giáo trình Bộ GD&ĐT 2021, tr.245-260',
    status: 'verified',
  },
  {
    id: 3,
    aiPrompt: 'Liệt kê các đặc trưng của Nhà nước pháp quyền XHCN Việt Nam',
    aiOutput: '8 đặc trưng chính bao gồm: tính tối thượng của HP và PL, bảo đảm quyền con người...',
    humanVerification: 'NQ 27-NQ/TW (2022) xác định 8 đặc trưng. Đã đối chiếu và bổ sung đặc trưng thứ 5 về kiểm soát quyền lực.',
    source: 'Nghị quyết 27-NQ/TW, Mục II',
    status: 'corrected',
  },
  {
    id: 4,
    aiPrompt: 'So sánh mô hình nhà nước pháp quyền Việt Nam với mô hình phương Tây',
    aiOutput: 'Phân tích điểm giống/khác về tam quyền phân lập vs. thống nhất quyền lực',
    humanVerification: 'Giáo trình so sánh: VN không áp dụng tam quyền phân lập mà thống nhất quyền lực có phân công. Đã chỉnh sửa thuật ngữ.',
    source: 'Giáo trình Bộ GD&ĐT 2021, tr.198-215',
    status: 'corrected',
  },
  {
    id: 5,
    aiPrompt: 'Tạo bài quiz tương tác về quyền và nghĩa vụ công dân theo Hiến pháp 2013',
    aiOutput: '8 câu hỏi trắc nghiệm về Chương II Hiến pháp 2013',
    humanVerification: 'Đã kiểm tra đáp án với Chương II HP 2013 (Điều 14-49). Câu 2 cần chỉnh sửa đáp án đúng từ "Chính phủ" sang "Quốc hội".',
    source: 'Hiến pháp 2013, Chương II',
    status: 'corrected',
  },
];
