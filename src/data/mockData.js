// ============================================================
// CONTENT DATA - Hanh trinh Phap quyen
// Nội dung học thuật đã rà soát theo các nguyên tắc cốt lõi của
// Hiến pháp 2013, bản sửa đổi bổ sung năm 2025, và Nghị quyết 27-NQ/TW.
// ============================================================

export const sidebarSections = [
  {
    id: 'duong-loi',
    title: 'Đảng lãnh đạo',
    description: 'Định hướng bằng cương lĩnh, chiến lược, nghị quyết; không làm thay Nhà nước',
    icon: 'ScrollText',
  },
  {
    id: 'branches',
    title: 'Bộ máy nhà nước',
    description: 'Quyền lực thống nhất, có phân công, phối hợp và kiểm soát',
    icon: 'Landmark',
  },
  {
    id: 'feedback',
    title: 'Nhân dân giám sát',
    description: 'Dân biết, dân bàn, dân làm, dân kiểm tra, dân giám sát, dân thụ hưởng',
    icon: 'Users',
  },
  {
    id: 'quiz',
    title: 'Minigame',
    description: 'Phân loại thẩm quyền lập pháp, hành pháp, tư pháp',
    icon: 'Gamepad2',
  },
  {
    id: 'transparency',
    title: 'AI Transparency',
    description: 'Đối chiếu nội dung AI với giáo trình và văn bản pháp luật',
    icon: 'Bot',
  },
];

export const nghiQuyetCard = {
  title: 'Nghị quyết 27-NQ/TW',
  date: '09/11/2022',
  subtitle: 'Hội nghị Trung ương 6 khóa XIII',
  content:
    'Tiếp tục xây dựng và hoàn thiện Nhà nước pháp quyền XHCN Việt Nam của Nhân dân, do Nhân dân, vì Nhân dân, dưới sự lãnh đạo của Đảng.',
  highlights: [
    'Thượng tôn Hiến pháp và pháp luật',
    'Kiểm soát quyền lực nhà nước',
    'Cải cách tư pháp',
    'Nền hành chính phục vụ',
  ],
};

export const legislativeOrgChart = {
  root: 'Quốc hội',
  children: [
    {
      name: 'Ủy ban Thường vụ Quốc hội',
      children: [
        { name: 'Hội đồng Dân tộc' },
        { name: 'Các Ủy ban của Quốc hội' },
        { name: 'Giám sát tối cao và giải thích Hiến pháp, luật, pháp lệnh theo thẩm quyền' },
      ],
    },
    {
      name: 'Đại biểu Quốc hội',
      children: [
        { name: 'Đại diện ý chí, nguyện vọng của Nhân dân' },
        { name: 'Chất vấn, giám sát, quyết định vấn đề quan trọng của đất nước' },
      ],
    },
  ],
};

export const legislativeModal = {
  title: 'Quốc hội: quyền lập pháp và giám sát tối cao',
  description:
    'Quốc hội là cơ quan đại biểu cao nhất của Nhân dân, cơ quan quyền lực nhà nước cao nhất. Trong cơ chế pháp quyền XHCN, Quốc hội làm Hiến pháp và luật, quyết định những vấn đề quan trọng của đất nước, đồng thời giám sát tối cao hoạt động của Nhà nước.',
  stats: [
    { label: 'Vai trò trung tâm', value: 'Lập pháp' },
    { label: 'Cơ chế kiểm soát', value: 'Giám sát' },
    { label: 'Kênh đại diện', value: 'Đại biểu' },
    { label: 'Căn cứ', value: 'HP 2013+' },
  ],
};

export const executiveTree = [
  {
    name: 'Chính phủ',
    level: 0,
    children: [
      {
        name: 'Thủ tướng Chính phủ',
        level: 1,
        children: [
          { name: 'Bộ và cơ quan ngang bộ', level: 2 },
          { name: 'Cơ quan thuộc Chính phủ', level: 2 },
          { name: 'Hệ thống dịch vụ công, dữ liệu và chuyển đổi số', level: 2 },
        ],
      },
    ],
  },
  {
    name: 'Chính quyền địa phương cấp tỉnh',
    level: 1,
    children: [
      {
        name: 'Chính quyền địa phương cấp xã',
        level: 2,
        children: [{ name: 'Phường / xã / đặc khu theo mô hình mới', level: 3 }],
      },
    ],
  },
];

export const executiveCaseStudy = {
  title: 'Đề án 06 và nền hành chính phục vụ',
  subtitle: 'Quyết định 06/QĐ-TTg ngày 06/01/2022',
  description:
    'Đề án phát triển ứng dụng dữ liệu dân cư, định danh và xác thực điện tử phục vụ chuyển đổi số quốc gia giai đoạn 2022-2025, tầm nhìn đến năm 2030. Nội dung trên web chỉ dùng như ví dụ về cải cách thủ tục và phục vụ người dân, không trình bày số liệu khi chưa có nguồn lớp học cung cấp.',
  metrics: [
    { label: 'Mục tiêu', value: 'Phục vụ', icon: 'Handshake' },
    { label: 'Công cụ', value: 'Dữ liệu', icon: 'Database' },
    { label: 'Kênh tiếp cận', value: 'DVC', icon: 'Globe' },
    { label: 'Trọng tâm', value: 'Người dân', icon: 'Users' },
  ],
};

export const judiciaryTree = [
  {
    name: 'Tòa án nhân dân tối cao',
    children: [
      {
        name: 'Tòa án nhân dân cấp tỉnh',
        children: [{ name: 'Tòa án nhân dân khu vực' }],
      },
      { name: 'Tòa án quân sự' },
      {
        name: 'Tòa chuyên trách theo luật định',
        children: [
          { name: 'Hình sự' },
          { name: 'Dân sự' },
          { name: 'Hành chính' },
          { name: 'Kinh tế / phá sản' },
          { name: 'Lao động, gia đình và người chưa thành niên' },
        ],
      },
    ],
  },
  {
    name: 'Viện kiểm sát nhân dân',
    children: [
      { name: 'Thực hành quyền công tố' },
      { name: 'Kiểm sát hoạt động tư pháp' },
      { name: 'Hệ thống VKSND các cấp và viện kiểm sát quân sự theo luật định' },
    ],
  },
];

export const judiciaryCases = [
  {
    id: 1,
    title: 'Xét xử độc lập, chỉ tuân theo pháp luật',
    type: 'Nguyên tắc tư pháp',
    summary:
      'Tòa án nhân dân là cơ quan xét xử, thực hiện quyền tư pháp. Khi trình bày, cần nhấn mạnh sự độc lập xét xử trong khuôn khổ Hiến pháp và pháp luật, không diễn giải thành mô hình tam quyền phân lập.',
    verdict: 'Cốt lõi: công lý, quyền con người, quyền công dân',
    significance: 'Liên hệ với yêu cầu cải cách tư pháp trong Nghị quyết 27-NQ/TW',
  },
  {
    id: 2,
    title: 'Viện kiểm sát trong cơ chế kiểm soát quyền lực',
    type: 'Công tố và kiểm sát',
    summary:
      'Viện kiểm sát nhân dân thực hành quyền công tố và kiểm sát hoạt động tư pháp, góp phần bảo đảm việc điều tra, truy tố, xét xử và thi hành án tuân thủ pháp luật.',
    verdict: 'Cốt lõi: chống oan sai, bỏ lọt tội phạm và lạm quyền',
    significance: 'Giúp sinh viên phân biệt Tòa án và Viện kiểm sát',
  },
  {
    id: 3,
    title: 'Tư pháp trong Nhà nước pháp quyền XHCN',
    type: 'Kiểm soát quyền lực',
    summary:
      'Cơ quan tư pháp không đứng tách khỏi hệ thống quyền lực nhà nước thống nhất, mà hoạt động trong cơ chế phân công, phối hợp và kiểm soát giữa các cơ quan nhà nước.',
    verdict: 'Cốt lõi: quyền lực thống nhất, có kiểm soát',
    significance: 'Tránh nhầm lẫn với cách diễn đạt “ba quyền phân lập”',
  },
];

export const feedbackComments = [
  {
    id: 1,
    type: 'citizen',
    name: 'Sinh viên A',
    location: 'Lớp MLN131',
    time: 'Mô phỏng',
    avatar: 'A',
    content:
      'Nếu quyền lực nhà nước là thống nhất thì cơ chế nào giúp tránh việc một cơ quan lạm quyền hoặc né tránh trách nhiệm?',
  },
  {
    id: 2,
    type: 'government',
    name: 'Nhóm thuyết trình',
    location: '',
    time: 'Phản hồi',
    avatar: 'N3',
    content:
      'Cơ chế kiểm soát nằm ở phân công, phối hợp, giám sát của Quốc hội, hoạt động kiểm tra - thanh tra, xét xử, kiểm sát tư pháp và quyền giám sát của Nhân dân.',
  },
  {
    id: 3,
    type: 'citizen',
    name: 'Sinh viên B',
    location: 'Lớp MLN131',
    time: 'Mô phỏng',
    avatar: 'B',
    content:
      'Đảng lãnh đạo Nhà nước và xã hội theo Điều 4 Hiến pháp, vậy có phải Đảng làm thay chức năng quản lý của Nhà nước không?',
  },
  {
    id: 4,
    type: 'government',
    name: 'Nhóm thuyết trình',
    location: '',
    time: 'Phản hồi',
    avatar: 'N3',
    content:
      'Không. Cách trình bày đúng là Đảng lãnh đạo bằng đường lối, chủ trương, công tác cán bộ và kiểm tra; Nhà nước thể chế hóa và tổ chức thực hiện bằng pháp luật.',
  },
  {
    id: 5,
    type: 'citizen',
    name: 'Sinh viên C',
    location: 'Lớp MLN131',
    time: 'Mô phỏng',
    avatar: 'C',
    content:
      'Người dân tham gia vào Nhà nước pháp quyền XHCN thông qua những kênh nào ngoài bầu cử?',
  },
  {
    id: 6,
    type: 'government',
    name: 'Nhóm thuyết trình',
    location: '',
    time: 'Phản hồi',
    avatar: 'N3',
    content:
      'Có thể góp ý chính sách, phản biện xã hội, khiếu nại - tố cáo, giám sát cộng đồng, tiếp xúc cử tri và tham gia dịch vụ công minh bạch.',
  },
];

export const leaderboardData = [
  { rank: 1, name: 'Nhóm Luật hiến pháp', score: 95, time: '1:23', medal: '1' },
  { rank: 2, name: 'Nhóm Hành pháp', score: 90, time: '1:45', medal: '2' },
  { rank: 3, name: 'Nhóm Tư pháp', score: 85, time: '1:52', medal: '3' },
  { rank: 4, name: 'Nhóm Dân chủ', score: 80, time: '1:58' },
  { rank: 5, name: 'Nhóm Pháp quyền', score: 75, time: '2:00' },
];

export const errorAnalyticsData = [
  { question: 'Câu 1', errorRate: 15, label: 'Câu 1', topic: 'Nguyên tắc pháp quyền' },
  { question: 'Câu 2', errorRate: 65, label: 'Câu 2', topic: 'Quyền tuyên bố chiến tranh', isHighlighted: true },
  { question: 'Câu 3', errorRate: 22, label: 'Câu 3', topic: 'Quốc hội' },
  { question: 'Câu 4', errorRate: 38, label: 'Câu 4', topic: 'Chính phủ' },
  { question: 'Câu 5', errorRate: 12, label: 'Câu 5', topic: 'Quyền công dân' },
  { question: 'Câu 6', errorRate: 28, label: 'Câu 6', topic: 'Hệ thống tư pháp' },
  { question: 'Câu 7', errorRate: 8, label: 'Câu 7', topic: 'Hiến pháp hiện hành' },
  { question: 'Câu 8', errorRate: 45, label: 'Câu 8', topic: 'Chính quyền địa phương' },
];

export const errorAnnotation = {
  question: 'Câu hỏi số 2',
  errorRate: '65%',
  detail: '"Cơ quan nào có quyền quyết định vấn đề chiến tranh và hòa bình?"',
  wrongAnswer: 'Chính phủ',
  correctAnswer: 'Quốc hội',
  reference: 'Hiến pháp 2013, Điều 70',
  explanation:
    'Đây là nhầm lẫn phổ biến giữa quyền quản lý, điều hành của Chính phủ và thẩm quyền quyết định vấn đề quan trọng của đất nước thuộc Quốc hội.',
};

export const transparencyData = [
  {
    id: 1,
    aiPrompt: 'Tạo sơ đồ bộ máy nhà nước Việt Nam theo Hiến pháp hiện hành',
    aiOutput: 'Ba nhóm quyền lực: lập pháp, hành pháp, tư pháp với các cơ quan tương ứng',
    humanVerification:
      'Đã chỉnh cách gọi: không trình bày “tam quyền phân lập”; dùng nguyên tắc quyền lực nhà nước thống nhất, có phân công, phối hợp, kiểm soát.',
    source: 'Hiến pháp 2013, sửa đổi bổ sung năm 2025, Điều 2',
    status: 'corrected',
  },
  {
    id: 2,
    aiPrompt: 'Giải thích “Đảng lãnh đạo, Nhà nước quản lý, Nhân dân làm chủ”',
    aiOutput: 'Phân tích quan hệ giữa Đảng, Nhà nước và Nhân dân trong nền dân chủ XHCN',
    humanVerification:
      'Đã bổ sung ý Đảng lãnh đạo bằng đường lối, chủ trương, công tác cán bộ và kiểm tra; không làm thay chức năng của Nhà nước.',
    source: 'Hiến pháp hiện hành, Điều 4; Giáo trình CNXH khoa học',
    status: 'verified',
  },
  {
    id: 3,
    aiPrompt: 'Liệt kê đặc trưng Nhà nước pháp quyền XHCN Việt Nam',
    aiOutput: 'Nhà nước của Nhân dân, do Nhân dân, vì Nhân dân; thượng tôn Hiến pháp và pháp luật',
    humanVerification:
      'Đã đối chiếu với Nghị quyết 27-NQ/TW, nhấn mạnh nhiệm vụ tiếp tục xây dựng Nhà nước pháp quyền XHCN Việt Nam dưới sự lãnh đạo của Đảng.',
    source: 'Nghị quyết 27-NQ/TW ngày 09/11/2022',
    status: 'verified',
  },
  {
    id: 4,
    aiPrompt: 'Cập nhật mô hình tòa án và chính quyền địa phương',
    aiOutput: 'Dữ liệu ban đầu còn nêu TAND cấp cao, TAND huyện/quận và UBND quận/huyện',
    humanVerification:
      'Đã sửa sang mô hình thận trọng: TAND tối cao, TAND cấp tỉnh, TAND khu vực; chính quyền địa phương cấp tỉnh và cấp xã theo cải cách hiện hành.',
    source: 'Luật Tổ chức TAND 2024; Luật Tổ chức chính quyền địa phương 2025',
    status: 'corrected',
  },
  {
    id: 5,
    aiPrompt: 'Tạo ví dụ tương tác về góp ý chính sách',
    aiOutput: 'Dùng các bình luận mô phỏng thay cho số liệu và vụ việc chưa có nguồn trong lớp học',
    humanVerification:
      'Đã loại các số liệu lớn và case-study cụ thể có nguy cơ gây hiểu nhầm nếu không trích nguồn đầy đủ.',
    source: 'Nguyên tắc minh bạch học thuật của nhóm',
    status: 'corrected',
  },
];
