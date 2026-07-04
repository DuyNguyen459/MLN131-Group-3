import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Building2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Gavel,
  Landmark,
  Menu,
  MessageSquareText,
  Network,
  Play,
  Scale,
  ShieldCheck,
  Star,
  Timer,
  Trash2,
  X,
} from 'lucide-react';
import heroImage from './assets/hero.png';
import stateDiagramImage from './assets/sơ đồ.png';
import page2Bg from './assets/trang 2.png';
import page3Bg from './assets/page3.png';
import page4Bg from './assets/page4.png';
import page5Bg from './assets/page5.png';
import page6Bg from './assets/page6.png';
import verificationImage from './assets/images.png';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const useRemoteDb = Boolean(SUPABASE_URL && SUPABASE_KEY);
const QUESTION_SECONDS = 10;
const drumPhotoUrl = 'https://baotanglichsu.vn/DataFiles/2023/01/News/Tieng%20Anh/The%20Ngoc%20Lu%20drum/Trong%20Ngoc%20Lu%202.jpg';

function DbStatusBadge({ status }) {
  if (status === 'missing') return null;
  const label = {
    connected: 'DB realtime đã kết nối',
    connecting: 'Đang kết nối DB',
    error: 'DB lỗi kết nối',
    missing: 'Chưa cấu hình DB',
  }[status] || 'DB chưa rõ trạng thái';
  return <span className={`db-status ${status}`}>{label}</span>;
}

const navItems = [
  { id: 'hero', label: 'Khởi động' },
  { id: 'party', label: 'Đảng lãnh đạo' },
  { id: 'branches', label: 'Bộ máy' },
  { id: 'feedback', label: 'Giải trình' },
  { id: 'quiz', label: 'Thử thách' },
  { id: 'transparency', label: 'Minh bạch' },
];

const officialNotes = [
  'Hiến pháp 2013: quyền lực nhà nước là thống nhất, có phân công, phối hợp, kiểm soát.',
  'Điều 4 Hiến pháp 2013: Đảng Cộng sản Việt Nam lãnh đạo Nhà nước và xã hội trong khuôn khổ Hiến pháp, pháp luật.',
  'Cập nhật mô hình địa phương đến tháng 7/2026 theo hướng hai cấp: cấp tỉnh và cấp xã; không trình bày cấp huyện như một cấp chính quyền địa phương hiện hành.',
  'Luật Tổ chức Tòa án nhân dân 2024: hệ thống tòa án có TAND tối cao, TAND cấp tỉnh, TAND khu vực và tòa án quân sự.',
];

const branchVerificationContent = {
  chinhphu: {
    title: 'Chính phủ hành động, Chính phủ phục vụ',
  
    points: [
      ['Cụ thể hóa pháp luật', 'Sau khi Quốc hội thông qua Luật Căn cước và Luật Cư trú, Chính phủ ban hành nghị định, chỉ đạo và hệ thống hướng dẫn thực thi.'],
      ['Số hóa dữ liệu dân cư', 'Dữ liệu dân cư được kết nối, chuẩn hóa và khai thác để cắt giảm hàng trăm thủ tục rườm rà.'],
      ['Dịch vụ công trực tuyến', 'Người dân có thể ngồi tại nhà để làm hộ chiếu, đăng ký khai sinh qua Cổng dịch vụ công trực tuyến.'],
      ['Phối hợp quyền lực', 'Quốc hội vạch hành lang pháp lý, Chính phủ linh hoạt và chủ động thực thi để mang lại lợi ích thực chất cho Nhân dân.'],
    ],
  },
  tuphap: {
    title: 'Tư pháp nghiêm minh, công lý độc lập',
    lead: 'Các đại án kinh tế, tham nhũng gần đây như Vạn Thịnh Phát, Trương Mỹ Lan hay vụ chuyến bay giải cứu cho thấy vai trò bảo vệ công lý của nhánh tư pháp.',
    points: [
      ['Xét xử công khai, minh bạch', 'Việc đưa các đại án ra xét xử thể hiện thông điệp: không có vùng cấm, không có ngoại lệ, bất kể người đó là ai.'],
      ['Độc lập theo pháp luật', 'Nguyên tắc cốt lõi của Hiến pháp là Thẩm phán và Hội thẩm xét xử độc lập và chỉ tuân theo pháp luật.'],
      ['Không can thiệp công lý', 'Sự độc lập xét xử bảo đảm không cá nhân nào có thể dùng tiền bạc hay quyền lực để tác động vào phán quyết.'],
      ['Niềm tin pháp lý', 'Nhánh tư pháp nghiêm minh là chỗ dựa và là niềm tin pháp lý của toàn thể Nhân dân.'],
    ],
  },
};

const partyMechanisms = [
  {
    title: 'Tính nhất nguyên chính trị',
    body: 'Trong hệ thống chính trị Việt Nam, Đảng giữ vai trò lãnh đạo thống nhất về định hướng.',
    evidence: 'Căn cứ học thuật: Điều 4 Hiến pháp 2013; giáo trình Chủ nghĩa xã hội khoa học.',
  },
  {
    title: 'Không làm thay Nhà nước',
    body: 'Đảng đề ra đường lối, chủ trương, nghị quyết. Nhà nước thể chế hóa bằng Hiến pháp, luật, nghị quyết, nghị định, quyết định và tổ chức thi hành theo thẩm quyền.',
    evidence: 'Điểm nhấn thuyết trình: “Đảng lãnh đạo, Nhà nước quản lý, Nhân dân làm chủ”.',
  },
  {
    title: 'Công tác cán bộ và kiểm tra',
    body: 'Vai trò lãnh đạo còn thể hiện qua định hướng cán bộ, kiểm tra, giám sát tổ chức đảng và đảng viên, qua đó bảo đảm bộ máy vận hành đúng mục tiêu phục vụ Nhân dân.',
    evidence: 'Không biến nội dung này thành sơ đồ mệnh lệnh hành chính; giữ đúng tinh thần môn học.',
  },
  {
    title: 'Nghị quyết 27-NQ/TW',
    body: 'Nghị quyết 27-NQ/TW ngày 09/11/2022 đặt trọng tâm tiếp tục xây dựng và hoàn thiện Nhà nước pháp quyền XHCN Việt Nam của Nhân dân, do Nhân dân, vì Nhân dân.',
    evidence: 'Từ khóa cần nhớ: thượng tôn Hiến pháp và pháp luật, kiểm soát quyền lực, cải cách tư pháp, hành chính phục vụ.',
  },
];

const stateBranches = [
  {
    id: 'quochoi',
    title: 'Quốc hội',
    role: 'Lập pháp',
    icon: Landmark,
    color: '#d4a017',
    summary: 'Cơ quan đại biểu cao nhất của Nhân dân, cơ quan quyền lực nhà nước cao nhất.',
    structure: [
      ['Quốc hội', 'Làm Hiến pháp, sửa đổi Hiến pháp; làm luật, sửa đổi luật; quyết định vấn đề quan trọng của đất nước.'],
      ['Ủy ban Thường vụ Quốc hội', 'Cơ quan thường trực của Quốc hội, thực hiện nhiệm vụ trong thời gian Quốc hội không họp theo thẩm quyền.'],
      ['Hội đồng Dân tộc và các Ủy ban', 'Thẩm tra dự án luật, giám sát chuyên đề, kiến nghị chính sách.'],
      ['Đại biểu Quốc hội', 'Đại diện ý chí, nguyện vọng của Nhân dân; chất vấn và giám sát.'],
    ],
    workflow: ['Sáng kiến chính sách', 'Thẩm tra', 'Thảo luận', 'Biểu quyết thông qua', 'Giám sát thực hiện'],
  },
  {
    id: 'chinhphu',
    title: 'Chính phủ',
    role: 'Hành pháp',
    icon: Building2,
    color: '#00a6c8',
    summary: 'Cơ quan hành chính nhà nước cao nhất, cơ quan chấp hành của Quốc hội.',
    structure: [
      ['Chính phủ', 'Thống nhất quản lý nền hành chính quốc gia, tổ chức thi hành Hiến pháp, luật, nghị quyết của Quốc hội.'],
      ['Thủ tướng Chính phủ', 'Lãnh đạo hoạt động của Chính phủ và hệ thống hành chính nhà nước.'],
      ['Bộ, cơ quan ngang bộ', 'Quản lý ngành, lĩnh vực; ban hành văn bản theo thẩm quyền; tổ chức dịch vụ công.'],
      ['Chính quyền địa phương cấp tỉnh, cấp xã', 'Tổ chức thực hiện pháp luật tại địa phương theo mô hình hai cấp cập nhật đến tháng 7/2026.'],
    ],
    workflow: ['Luật được thông qua', 'Chính phủ ban hành chương trình', 'Bộ ngành hướng dẫn', 'Địa phương thực hiện', 'Người dân sử dụng dịch vụ công'],
  },
  {
    id: 'tuphap',
    title: 'Tòa án & Viện kiểm sát',
    role: 'Tư pháp',
    icon: Gavel,
    color: '#c1121f',
    summary: 'Bảo vệ công lý, quyền con người, quyền công dân; kiểm sát hoạt động tư pháp theo luật định.',
    structure: [
      ['TAND tối cao', 'Cơ quan xét xử cao nhất của nước CHXHCN Việt Nam.'],
      ['TAND cấp tỉnh', 'Xét xử theo thẩm quyền tại địa phương cấp tỉnh.'],
      ['TAND khu vực', 'Mô hình tòa án theo Luật Tổ chức TAND 2024, thay cho cách hiểu cũ gắn với cấp huyện.'],
      ['Viện kiểm sát nhân dân', 'Thực hành quyền công tố và kiểm sát hoạt động tư pháp.'],
    ],
    workflow: ['Tiếp nhận vụ việc', 'Điều tra, truy tố theo luật', 'Xét xử độc lập', 'Kiểm sát tư pháp', 'Thi hành bản án/quyết định'],
  },
];

const transparencyRows = [
  ['Ý tưởng giao diện', 'AI gợi ý hướng civic-tech, radial hub, dashboard', 'Nhóm tự chọn bố cục cuối, tự chỉnh nội dung và kiểm tra khả năng trình bày.'],
  ['Câu hỏi minigame', 'AI hỗ trợ phác thảo dạng tình huống', 'Nhóm biên tập lại theo kiến thức môn học, tránh câu hỏi gây hiểu sai thẩm quyền.'],
  ['Thuật ngữ chính trị', 'AI có thể đề xuất diễn đạt', 'Nhóm đối chiếu với giáo trình, Hiến pháp 2013 và văn bản pháp luật trước khi đưa lên web.'],
  ['Code và thiết kế', 'AI hỗ trợ gợi ý giao diện và cấu trúc mã', 'Nhóm chịu trách nhiệm vận hành, kiểm thử, quyết định nội dung và cách thuyết trình.'],
];

const questions = [
  [
    'Cơ quan nào có thẩm quyền lập pháp cao nhất?', 
    ['Quốc hội', 'Chính phủ', 'Tòa án nhân dân', 'UBND cấp tỉnh'], 
    'Quốc hội',
    'Giải thích: Theo Điều 69 Hiến pháp 2013, Quốc hội là cơ quan đại biểu cao nhất của Nhân dân, cơ quan quyền lực nhà nước cao nhất của nước Cộng hòa xã hội chủ nghĩa Việt Nam, thực hiện quyền lập hiến và quyền lập pháp.'
  ],
  [
    'Cơ quan nào quyết định vấn đề chiến tranh và hòa bình?', 
    ['Chính phủ', 'Chủ tịch nước', 'Quốc hội', 'TAND tối cao'], 
    'Quốc hội',
    'Giải thích: Theo Điều 70 Hiến pháp 2013, Quốc hội có nhiệm vụ và quyền hạn quyết định vấn đề chiến tranh và hòa bình, quy định về tình trạng khẩn cấp và các biện pháp đặc biệt khác bảo đảm quốc phòng, an ninh quốc gia.'
  ],
  [
    'Cơ quan nào thực hiện quyền xét xử?', 
    ['Tòa án nhân dân', 'Chính phủ', 'Quốc hội', 'Mặt trận Tổ quốc'], 
    'Tòa án nhân dân',
    'Giải thích: Theo Điều 102 Hiến pháp 2013, Tòa án nhân dân là cơ quan xét xử của nước Cộng hòa xã hội chủ nghĩa Việt Nam, thực hiện quyền tư pháp.'
  ],
  [
    'Chính phủ là cơ quan chấp hành của cơ quan nào?', 
    ['Quốc hội', 'TAND tối cao', 'VKSND tối cao', 'UBND cấp tỉnh'], 
    'Quốc hội',
    'Giải thích: Theo Điều 94 Hiến pháp 2013, Chính phủ là cơ quan hành chính nhà nước cao nhất, thực hiện quyền hành pháp và là cơ quan chấp hành của Quốc hội, chịu trách nhiệm và báo cáo công tác trước Quốc hội.'
  ],
  [
    'Viện kiểm sát nhân dân thực hành quyền gì?', 
    ['Công tố và kiểm sát tư pháp', 'Lập pháp', 'Ban hành Hiến pháp', 'Quyết định ngân sách lớp'], 
    'Công tố và kiểm sát tư pháp',
    'Giải thích: Theo Điều 107 Hiến pháp 2013, Viện kiểm sát nhân dân thực hành quyền công tố (buộc tội của Nhà nước tại tòa) và kiểm sát hoạt động tư pháp (giám sát việc tuân theo pháp luật trong điều tra, xét xử, thi hành án).'
  ],
  [
    'Nguyên tắc quyền lực nhà nước ở Việt Nam là gì?', 
    ['Thống nhất, có phân công phối hợp kiểm soát', 'Tam quyền phân lập tuyệt đối', 'Không cần kiểm soát', 'Tập trung ở một cá nhân'], 
    'Thống nhất, có phân công phối hợp kiểm soát',
    'Giải thích: Theo Điều 2 Hiến pháp 2013, quyền lực nhà nước là thống nhất, có sự phân công, phối hợp, kiểm soát giữa các cơ quan nhà nước trong việc thực hiện các quyền lập pháp, hành pháp, tư pháp. Không áp dụng tam quyền phân lập đối lập.'
  ],
  [
    'Đảng lãnh đạo Nhà nước chủ yếu bằng gì?', 
    ['Đường lối, chủ trương, nghị quyết', 'Bản án', 'Giấy phép xây dựng', 'Phiếu điểm'], 
    'Đường lối, chủ trương, nghị quyết',
    'Giải thích: Đảng Cộng sản Việt Nam lãnh đạo Nhà nước và xã hội bằng Cương lĩnh, chiến lược, các định hướng về chính sách và chủ trương lớn (thông qua các Nghị quyết); Nhà nước sẽ thể chế hóa đường lối của Đảng thành Hiến pháp và pháp luật để quản lý xã hội.'
  ],
  [
    'Cơ quan đại biểu cao nhất của Nhân dân là?', 
    ['Quốc hội', 'Chính phủ', 'TAND khu vực', 'Sở Tư pháp'], 
    'Quốc hội',
    'Giải thích: Quốc hội do cử tri cả nước thông qua bầu cử phổ thông, bình đẳng, trực tiếp và bỏ phiếu kín bầu ra, là cơ quan đại biểu cao nhất đại diện cho ý chí, nguyện vọng và quyền làm chủ của toàn dân.'
  ],
  [
    'Đề án 06 thường gắn với nội dung nào?', 
    ['Dữ liệu dân cư và định danh điện tử', 'Xét xử phúc thẩm', 'Bầu cử đại biểu Quốc hội', 'Kiểm sát truy tố'], 
    'Dữ liệu dân cư và định danh điện tử',
    'Giải thích: Đề án 06 là "Đề án phát triển ứng dụng dữ liệu về dân cư, định danh và xác thực điện tử phục vụ chuyển đổi số quốc gia giai đoạn 2022 - 2025, tầm nhìn đến năm 2030", là minh chứng điển hình cho quản lý hành pháp hiện đại phục vụ Nhân dân.'
  ],
  [
    'Cơ quan nào tổ chức thi hành pháp luật ở tầm hành chính cao nhất?', 
    ['Chính phủ', 'Quốc hội', 'Tòa án', 'Viện kiểm sát'], 
    'Chính phủ',
    'Giải thích: Chính phủ là cơ quan thực hiện quyền hành pháp, đứng đầu hệ thống hành chính nhà nước từ trung ương đến địa phương, có trách nhiệm tổ chức thi hành Hiến pháp, luật, nghị quyết của Quốc hội trên phạm vi toàn quốc.'
  ],
  [
    'Thẩm phán và Hội thẩm khi xét xử phải tuân theo gì?', 
    ['Pháp luật', 'Ý kiến mạng xã hội', 'Bình chọn khán giả', 'Lệnh miệng'], 
    'Pháp luật',
    'Giải thích: Theo khoản 2 Điều 103 Hiến pháp 2013, Thẩm phán và Hội thẩm xét xử độc lập và chỉ tuân theo pháp luật; nghiêm cấm mọi cơ quan, tổ chức, cá nhân can thiệp trái pháp luật vào việc xét xử.'
  ],
  [
    'Người dân góp ý dự thảo luật thể hiện nội dung nào?', 
    ['Dân chủ và giám sát xã hội', 'Thay thế Quốc hội', 'Tự ban hành luật', 'Xét xử hành chính'], 
    'Dân chủ và giám sát xã hội',
    'Giải thích: Việc người dân tham gia đóng góp ý kiến, phản biện vào các dự thảo luật là biểu hiện trực tiếp của nền dân chủ XHCN, thể hiện quyền làm chủ và giám sát phản biện xã hội đối với hoạt động lập pháp của Nhà nước.'
  ],
  [
    '“Dân biết, dân bàn, dân làm...” nhấn mạnh điều gì?', 
    ['Quyền làm chủ của Nhân dân', 'Quyền lực cá nhân', 'Bỏ qua pháp luật', 'Không cần giải trình'], 
    'Quyền làm chủ của Nhân dân',
    'Giải thích: Phương châm "Dân biết, dân bàn, dân làm, dân kiểm tra, dân giám sát, dân thụ hưởng" thể hiện bản chất của nền dân chủ XHCN, khẳng định Nhân dân là chủ thể tối cao của quyền lực nhà nước.'
  ],
  [
    'Nghị quyết 27-NQ/TW liên quan trực tiếp đến nội dung nào?', 
    ['Xây dựng Nhà nước pháp quyền XHCN', 'Quy định lịch thi', 'Luật giao thông đường thủy', 'Quy chế thể thao'], 
    'Xây dựng Nhà nước pháp quyền XHCN',
    'Giải thích: Nghị quyết số 27-NQ/TW ngày 09/11/2022 của Hội nghị Trung ương 6 khóa XIII là Nghị quyết chuyên đề quan trọng về "Tiếp tục xây dựng và hoàn thiện Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam trong giai đoạn mới".'
  ],
  [
    'Cơ quan nào giám sát tối cao hoạt động của Nhà nước?', 
    ['Quốc hội', 'Chính phủ', 'UBND cấp xã', 'TAND khu vực'], 
    'Quốc hội',
    'Giải thích: Theo Điều 69 Hiến pháp 2013, Quốc hội thực hiện quyền giám sát tối cao việc tuân theo Hiến pháp, luật và nghị quyết của Quốc hội đối với toàn bộ hoạt động của các cơ quan trong bộ máy nhà nước.'
  ],
  [
    'Cơ quan hành chính nhà nước cao nhất là?', 
    ['Chính phủ', 'Quốc hội', 'VKSND tối cao', 'TAND tối cao'], 
    'Chính phủ',
    'Giải thích: Theo Điều 94 Hiến pháp 2013, Chính phủ là cơ quan hành chính nhà nước cao nhất của nước Cộng hòa xã hội chủ nghĩa Việt Nam, quản lý thống nhất nền hành chính quốc gia.'
  ],
  [
    'TAND tối cao thuộc nhóm quyền lực nào?', 
    ['Tư pháp', 'Lập pháp', 'Hành pháp', 'Mặt trận'], 
    'Tư pháp',
    'Giải thích: Tòa án nhân dân tối cao là cơ quan xét xử cao nhất của nước ta, đóng vai trò trung tâm và chủ đạo trong việc thực hiện quyền tư pháp, bảo vệ công lý và quyền con người.'
  ],
  [
    'Quốc hội quyết định vấn đề quan trọng của đất nước thuộc chức năng nào?', 
    ['Quyết định vấn đề quan trọng', 'Công tố', 'Xét xử sơ thẩm', 'Cấp căn cước'], 
    'Quyết định vấn đề quan trọng',
    'Giải thích: Quốc hội có 3 chức năng hiến định cốt lõi: (1) Lập hiến, lập pháp; (2) Giám sát tối cao; (3) Quyết định các vấn đề quan trọng của đất nước (tài chính, ngân sách, tổ chức bộ máy, nhân sự cao cấp, quốc phòng - an ninh...).'
  ],
  [
    'Dịch vụ công trực tuyến là ví dụ của nhóm nào?', 
    ['Hành pháp', 'Tư pháp', 'Lập pháp', 'Kiểm toán lớp học'], 
    'Hành pháp',
    'Giải thích: Dịch vụ công trực tuyến (cấp CCCD, đăng ký kinh doanh, thủ tục đất đai...) là hoạt động quản lý hành chính phục vụ xã hội và tổ chức thi hành pháp luật, thuộc chức năng của nhánh hành pháp.'
  ],
  [
    'Cơ chế giải trình nghĩa là gì?', 
    ['Cơ quan tiếp thu hoặc nêu lý do không tiếp thu', 'Xóa mọi ý kiến trái chiều', 'Chỉ nhận ý kiến đúng', 'Không công khai'], 
    'Cơ quan tiếp thu hoặc nêu lý do không tiếp thu',
    'Giải thích: Trách nhiệm giải trình đòi hỏi các cơ quan nhà nước khi tiếp nhận ý kiến đóng góp, kiến nghị, phản biện của Nhân dân phải có nghĩa vụ tổng hợp, xem xét tiếp thu, hoặc công khai nêu rõ lý do pháp lý và thực tiễn nếu không tiếp thu.'
  ],
  [
    'Cơ quan nào ban hành luật?', 
    ['Quốc hội', 'Chính phủ', 'TAND khu vực', 'Công an xã'], 
    'Quốc hội',
    'Giải thích: Quốc hội là cơ quan duy nhất có quyền thông qua, ban hành Hiến pháp, bộ luật, luật và nghị quyết (thực hiện quyền lập pháp).'
  ],
  [
    'Cơ quan nào bảo vệ công lý thông qua xét xử?', 
    ['Tòa án nhân dân', 'Bộ Nội vụ', 'Quốc hội', 'HĐND'], 
    'Tòa án nhân dân',
    'Giải thích: Theo Điều 102 Hiến pháp 2013, Tòa án nhân dân có nhiệm vụ bảo vệ công lý, bảo vệ quyền con người, quyền công dân, bảo vệ chế độ XHCN, bảo vệ lợi ích của Nhà nước, quyền và lợi ích hợp pháp của tổ chức, cá nhân thông qua xét xử.'
  ],
  [
    'Việc kiểm soát quyền lực nhằm mục tiêu gì?', 
    ['Tránh lạm quyền và bảo vệ quyền lợi hợp pháp', 'Làm chậm mọi quyết định', 'Tăng thủ tục vô nghĩa', 'Bỏ giám sát'], 
    'Tránh lạm quyền và bảo vệ quyền lợi hợp pháp',
    'Giải thích: Kiểm soát quyền lực nhà nước nhằm bảo đảm quyền lực được tuân thủ Hiến pháp và pháp luật, ngăn ngừa hiện tượng lạm quyền, tha hóa quyền lực, tham nhũng, từ đó bảo vệ tối đa lợi ích hợp pháp của Nhân dân.'
  ],
  [
    'Cấp chính quyền địa phương cập nhật đến 7/2026 nên trình bày theo mô hình nào?', 
    ['Cấp tỉnh và cấp xã', 'Tỉnh, huyện, xã như cũ', 'Chỉ có trung ương', 'Chỉ có cấp huyện'], 
    'Cấp tỉnh và cấp xã',
    'Giải thích: Theo định hướng tinh gọn bộ máy, hiện đại hóa nền hành chính và lộ trình cải cách thể chế đến năm 2026, mô hình chính quyền địa phương được tinh gọn theo hướng tối ưu hóa (giảm nấc trung gian, tập trung vào cấp tỉnh hoạch định và cấp xã trực tiếp thực thi phục vụ dân).'
  ],
  [
    'Đại biểu Quốc hội có vai trò nào?', 
    ['Đại diện ý chí, nguyện vọng của Nhân dân', 'Xét xử bị cáo', 'Cấp giấy phép lái xe', 'Kiểm sát điều tra'], 
    'Đại diện ý chí, nguyện vọng của Nhân dân',
    'Giải thích: Theo Điều 79 Hiến pháp 2013, Đại biểu Quốc hội là người đại diện cho ý chí, nguyện vọng của Nhân dân ở đơn vị bầu cử ra mình và của Nhân dân cả nước; chịu trách nhiệm trước cử tri và trước Quốc hội.'
  ],
  [
    'Cổng ý kiến Nhân dân trong web mô phỏng nghiệp vụ nào?', 
    ['Tiếp nhận, phân loại, xử lý, giải trình', 'Chơi game giải trí thuần túy', 'Bán hàng', 'Quảng cáo'], 
    'Tiếp nhận, phân loại, xử lý, giải trình',
    'Giải thích: Trong Website Mockup của dự án, "Cổng tiếp nhận ý kiến Nhân dân" mô phỏng 4 bước chuẩn của nền quản trị dân chủ: Tiếp nhận phản hồi -> Phân loại ý kiến -> Xử lý theo thẩm quyền -> Giải trình công khai trước Nhân dân.'
  ],
  [
    'AI trong bài này được dùng như thế nào?', 
    ['Công cụ tham khảo, nhóm vẫn quyết định nội dung', 'Thay nhóm làm toàn bộ', 'Nguồn pháp luật chính thức', 'Công cụ chấm điểm môn học'], 
    'Công cụ tham khảo, nhóm vẫn quyết định nội dung',
    'Giải thích: AI được nhóm sử dụng như công cụ hỗ trợ lên ý tưởng, viết code mockup và tra cứu nhanh; trong khi toàn bộ tính chính xác của kiến thức pháp lý, lập luận học thuật và quyết định cuối cùng hoàn toàn do nhóm sinh viên làm chủ và chịu trách nhiệm.'
  ],
  [
    '“Nhà nước của Nhân dân, do Nhân dân, vì Nhân dân” nhấn mạnh điều gì?', 
    ['Bản chất phục vụ Nhân dân', 'Quyền lực tách khỏi Nhân dân', 'Không cần bầu cử', 'Không cần pháp luật'], 
    'Bản chất phục vụ Nhân dân',
    'Giải thích: Đây là nguyên tắc khẳng định bản chất ưu việt của nền dân chủ XHCN: mọi quyền lực nhà nước thuộc về Nhân dân, do Nhân dân lập ra, giám sát và hoạt động vì mục tiêu duy nhất là đem lại tự do, ấm no, hạnh phúc cho Nhân dân.'
  ],
  [
    'Khi một chính sách được ban hành, nhóm hành pháp làm gì?', 
    ['Tổ chức thi hành', 'Tuyên án', 'Sửa Hiến pháp một mình', 'Thay đại biểu biểu quyết'], 
    'Tổ chức thi hành',
    'Giải thích: Chức năng cốt lõi của nhánh hành pháp (Chính phủ, các Bộ, UBND các cấp) là tổ chức triển khai, thi hành luật và chính sách vào đời sống thực tiễn thông qua hệ thống văn bản hướng dẫn và công cụ hành chính.'
  ],
  [
    'Hội đồng Dân tộc và các Ủy ban của Quốc hội thường làm gì?', 
    ['Thẩm tra và giám sát chuyên đề', 'Xét xử sơ thẩm', 'Cấp căn cước công dân', 'Điều tra hình sự'], 
    'Thẩm tra và giám sát chuyên đề',
    'Giải thích: Các Ủy ban của Quốc hội và Hội đồng Dân tộc có cơ cấu chuyên môn sâu, thực hiện vai trò thẩm tra các dự án luật, báo cáo trước khi trình Quốc hội, đồng thời trực tiếp tiến hành các đoàn giám sát chuyên đề.'
  ],
  [
    'Tòa án nhân dân khu vực thuộc hệ thống nào?', 
    ['Tòa án nhân dân', 'Chính phủ', 'Quốc hội', 'Mặt trận Tổ quốc'], 
    'Tòa án nhân dân',
    'Giải thích: Tòa án nhân dân khu vực (hoặc cấp huyện/thành phố trực thuộc) là đơn vị cơ sở thuộc hệ thống Tòa án nhân dân, thực hiện thẩm quyền xét xử sơ thẩm theo quy định của pháp luật.'
  ],
  [
    'Khi người dân khiếu nại quyền lợi bị xâm phạm, cơ quan xét xử độc lập là?', 
    ['Tòa án nhân dân', 'Chính phủ', 'Quốc hội', 'Bộ Tài chính'], 
    'Tòa án nhân dân',
    'Giải thích: Tòa án là thiết chế tài phán độc lập thuộc nhánh tư pháp, nơi người dân có quyền khởi kiện các vụ án dân sự, tranh chấp kinh tế hoặc khiếu kiện hành chính để bảo vệ quyền và lợi ích hợp pháp của mình.'
  ],
  [
    'Cơ quan nào công bố lệnh, quyết định theo thẩm quyền trong một số trường hợp sau quyết định của Quốc hội?', 
    ['Chủ tịch nước', 'TAND khu vực', 'UBND xã', 'Ủy ban MTTQ'], 
    'Chủ tịch nước',
    'Giải thích: Theo Điều 88 Hiến pháp 2013, Chủ tịch nước với vai trò Nguyên thủ quốc gia có thẩm quyền công bố Hiến pháp, luật, pháp lệnh; ban hành lệnh, quyết định để thực hiện các nhiệm vụ được Hiến pháp định đoạt sau khi Quốc hội thông qua.'
  ],
  [
    'Trong bài học, không nên trình bày Việt Nam theo mô hình nào?', 
    ['Tam quyền phân lập tuyệt đối', 'Quyền lực thống nhất', 'Có kiểm soát quyền lực', 'Có phân công phối hợp'], 
    'Tam quyền phân lập tuyệt đối',
    'Giải thích: Nhà nước pháp quyền XHCN Việt Nam vận hành theo nguyên tắc "Quyền lực nhà nước là thống nhất, có sự phân công, phối hợp, kiểm soát", kiên quyết từ chối mô hình "Tam quyền phân lập tuyệt đối" (đối lập, triệt tiêu quyền lực lẫn nhau như ở tư bản).'
  ],
  [
    'Cải cách tư pháp gắn với yêu cầu nào?', 
    ['Bảo vệ công lý và quyền con người', 'Bỏ xét xử', 'Giảm minh bạch', 'Tăng tùy tiện'], 
    'Bảo vệ công lý và quyền con người',
    'Giải thích: Nghị quyết 27-NQ/TW và Chiến lược cải cách tư pháp đặt trọng tâm xây dựng nền tư pháp chuyên nghiệp, công bằng, nghiêm minh, liêm chính, lấy bảo vệ công lý, bảo vệ quyền con người và quyền công dân làm mục tiêu cao nhất.'
  ],
  [
    'Chính quyền địa phương thực hiện nhiệm vụ theo nguyên tắc nào?', 
    ['Theo Hiến pháp, luật và phân quyền, phân cấp', 'Tự ý trái luật', 'Không cần trách nhiệm', 'Chỉ theo bình chọn'], 
    'Theo Hiến pháp, luật và phân quyền, phân cấp',
    'Giải thích: Theo Điều 112 Hiến pháp 2013, nhiệm vụ, quyền hạn của chính quyền địa phương được xác định trên cơ sở phân định thẩm quyền giữa các cơ quan nhà nước ở trung ương và địa phương theo nguyên tắc phân quyền, phân cấp và bảo đảm tính thống nhất của Hiến pháp, pháp luật.'
  ],
  [
    'Một dự thảo chính sách cần lấy ý kiến để làm gì?', 
    ['Tăng dân chủ, hoàn thiện chính sách', 'Làm trang trí', 'Thay thế toàn bộ quy trình lập pháp', 'Bỏ qua chuyên môn'], 
    'Tăng dân chủ, hoàn thiện chính sách',
    'Giải thích: Việc lấy ý kiến Nhân dân đối với dự thảo pháp luật/chính sách nhằm thực hành quyền dân chủ rộng rãi, huy động trí tuệ tập thể và phản biện xã hội, bảo đảm tính khả thi và hoàn thiện chính sách trước khi ban hành.'
  ],
  [
    'Bảng thống kê lỗi sai trong game giúp gì?', 
    ['Nhận diện phần kiến thức lớp hay nhầm', 'Chọn người thắng theo cảm tính', 'Ẩn lỗi sai', 'Xóa điểm đúng'], 
    'Nhận diện phần kiến thức lớp hay nhầm',
    'Giải thích: Bảng thống kê lỗi sai (Error Analytics Dashboard) trong Website Mockup giúp giảng viên và nhóm thuyết trình ngay lập tức nhận diện được những lỗ hổng kiến thức hoặc khái niệm mà nhiều bạn sinh viên còn nhầm lẫn để giải thích sâu hơn.'
  ],
  [
    'Leaderboard xếp hạng theo tiêu chí nào?', 
    ['Điểm cao hơn, nếu bằng điểm thì thời gian ngắn hơn', 'Tên dài hơn', 'Vào chơi trước luôn thắng', 'Chọn ngẫu nhiên'], 
    'Điểm cao hơn, nếu bằng điểm thì thời gian ngắn hơn',
    'Giải thích: Để đảm bảo tính cạnh tranh và công bằng trong Minigame, Bảng xếp hạng (Leaderboard) lập trình tiêu chí ưu tiên theo tổng điểm số (Score); trường hợp hai người bằng điểm thì người hoàn thành với tổng thời gian ngắn hơn (Time) sẽ xếp trên.'
  ],
  [
    'Cơ chế kiểm soát quyền lực gồm nội dung nào?', 
    ['Phân công, phối hợp, giám sát, kiểm tra, xét xử, kiểm sát', 'Không ai kiểm tra ai', 'Chỉ có một cơ quan tự quyết mọi việc', 'Bỏ trách nhiệm giải trình'], 
    'Phân công, phối hợp, giám sát, kiểm tra, xét xử, kiểm sát',
    'Giải thích: Cơ chế kiểm soát quyền lực nhà nước ở Việt Nam là sự kết hợp đồng bộ của: Quốc hội/HĐND giám sát; Chính phủ thanh tra, kiểm tra; Viện kiểm sát thực hành công tố, kiểm sát; Tòa án xét xử độc lập; và sự giám sát phản biện từ Mặt trận Tổ quốc cùng Nhân dân.'
  ],
  [
    'Bộ, cơ quan ngang bộ thuộc nhánh nào?', 
    ['Hành pháp', 'Tư pháp', 'Lập pháp', 'Cử tri'], 
    'Hành pháp',
    'Giải thích: Các Bộ và cơ quan ngang Bộ là cơ quan chuyên môn thuộc Chính phủ, thực hiện chức năng quản lý nhà nước về một hoặc một số ngành, lĩnh vực (kinh tế, y tế, giáo dục, quốc phòng...) thuộc nhánh hành pháp.'
  ],
  [
    'Một phiên chất vấn Quốc hội thể hiện chức năng gì?', 
    ['Giám sát và yêu cầu giải trình', 'Xét xử hình sự', 'Cấp căn cước', 'Công tố'], 
    'Giám sát và yêu cầu giải trình',
    'Giải thích: Hoạt động chất vấn tại kỳ họp Quốc hội là hình thức giám sát tối cao mạnh mẽ và trực tiếp nhất, yêu cầu các thành viên Chính phủ, Trưởng ngành phải trực tiếp giải trình công khai, minh bạch về các vấn đề nóng thuộc trách nhiệm quản lý.'
  ],
  [
    'Viện kiểm sát khác Tòa án ở điểm nào?', 
    ['Kiểm sát và công tố, không phải cơ quan xét xử', 'Làm luật', 'Quyết định chiến tranh', 'Quản lý dịch vụ công'], 
    'Kiểm sát và công tố, không phải cơ quan xét xử',
    'Giải thích: Trong nhánh tư pháp, Viện kiểm sát có chức năng chuyên biệt là thực hành quyền công tố (buộc tội trước tòa) và kiểm sát hoạt động tư pháp; trong khi Tòa án mới là thiết chế tài phán có quyền quyết định xét xử (ra bản án, quyết định).'
  ],
  [
    'Thượng tôn Hiến pháp và pháp luật nghĩa là gì?', 
    ['Mọi chủ thể hoạt động trong khuôn khổ pháp luật', 'Luật chỉ để tham khảo', 'Cơ quan nào cũng tùy ý', 'Không cần văn bản'], 
    'Mọi chủ thể hoạt động trong khuôn khổ pháp luật',
    'Giải thích: Nguyên tắc "Thượng tôn Hiến pháp và pháp luật" đòi hỏi Hiến pháp và pháp luật phải giữ vị trí tối cao; mọi cơ quan nhà nước, tổ chức kinh tế, xã hội, cán bộ, đảng viên và công dân đều bình đẳng trước pháp luật và phải tuân thủ nghiêm ngặt pháp luật.'
  ],
  [
    'Nhân dân giám sát Nhà nước thông qua kênh nào?', 
    ['Góp ý, tiếp xúc cử tri, phản biện, khiếu nại, tố cáo theo luật', 'Chỉ bình luận ẩn danh', 'Tự tuyên án', 'Tự ban hành nghị định'], 
    'Góp ý, tiếp xúc cử tri, phản biện, khiếu nại, tố cáo theo luật',
    'Giải thích: Người dân thực hiện quyền giám sát thông qua cơ chế dân chủ trực tiếp và gián tiếp: tiếp xúc cử tri, gửi ý kiến phản ánh, tham gia phản biện xã hội qua Mặt trận Tổ quốc, hoặc thực hiện quyền khiếu nại, tố cáo các hành vi vi phạm pháp luật.'
  ],
  [
    'Mục tiêu của Nhà nước pháp quyền XHCN Việt Nam là?', 
    ['Phục vụ Nhân dân, bảo vệ quyền và lợi ích hợp pháp', 'Tách khỏi Nhân dân', 'Không cần kiểm soát quyền lực', 'Bỏ pháp luật'], 
    'Phục vụ Nhân dân, bảo vệ quyền và lợi ích hợp pháp',
    'Giải thích: Mục tiêu tối cao của xây dựng Nhà nước pháp quyền XHCN là tạo dựng một bộ máy trong sạch, vững mạnh, hiệu lực, hiệu quả, lấy việc phục vụ Nhân dân làm trung tâm, bảo vệ quyền con người, quyền công dân và các lợi ích hợp pháp trong xã hội.'
  ],
  [
    'Câu nào đúng về Đảng và Nhà nước?', 
    ['Đảng lãnh đạo, Nhà nước thể chế hóa và tổ chức thực hiện', 'Đảng xét xử thay Tòa án', 'Nhà nước không cần pháp luật', 'Quốc hội không có vai trò lập pháp'], 
    'Đảng lãnh đạo, Nhà nước thể chế hóa và tổ chức thực hiện',
    'Giải thích: Theo cơ chế vận hành của hệ thống chính trị Việt Nam ("Đảng lãnh đạo, Nhà nước quản lý, Nhân dân làm chủ"), Đảng đề ra đường lối, định hướng chiến lược; Nhà nước thể chế hóa đường lối đó thành Hiến pháp, pháp luật để quản lý xã hội.'
  ],
  [
    'Câu nào đúng về TAND tối cao?', 
    ['Là cơ quan xét xử cao nhất', 'Là cơ quan hành chính cao nhất', 'Là cơ quan đại biểu cao nhất', 'Là tổ chức xã hội nghề nghiệp'], 
    'Là cơ quan xét xử cao nhất',
    'Giải thích: Theo Điều 104 Hiến pháp 2013, Tòa án nhân dân tối cao là cơ quan xét xử cao nhất của nước Cộng hòa xã hội chủ nghĩa Việt Nam, có nhiệm vụ giám đốc thẩm, tái thẩm bản án của các tòa án khác và tổng kết thực tiễn xét xử.'
  ],
  [
    'Trong game, mỗi câu đúng được bao nhiêu điểm?', 
    ['1 điểm', '10 điểm', '100 điểm', 'Tùy người chơi'], 
    '1 điểm',
    'Giải thích: Trong quy tắc lập trình Minigame của Website Mockup, mỗi câu trả lời đúng được tính quy chuẩn là 1 điểm để dễ dàng thống kê, tính toán tỷ lệ chính xác và hiển thị trực quan trên Bảng thống kê lỗi sai cũng như Leaderboard.'
  ],
  [
    'Vì sao hệ thống trộn câu hỏi cho từng lượt chơi?', 
    ['Giảm học tủ, tăng công bằng khi nhiều người tham gia', 'Làm cho thiếu dữ liệu', 'Để ẩn đáp án đúng', 'Để bỏ thống kê'], 
    'Giảm học tủ, tăng công bằng khi nhiều người tham gia',
    'Giải thích: Trong thiết kế hệ thống tương tác học thuật, thuật toán trộn ngẫu nhiên câu hỏi và đáp án (Randomize) giúp ngăn chặn tình trạng ghi nhớ vị trí đáp án (học tủ), bảo đảm tính cạnh tranh công bằng tuyệt đối cho tất cả sinh viên khi chơi đồng thời.'
  ]
];

function encodePostgrestIds(ids) {
  return ids.map((id) => `"${String(id).replaceAll('"', '\\"')}"`).join(',');
}

async function syncRemoteTable(table, previous, value) {
  if (!useRemoteDb) return;
  const headers = {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'resolution=merge-duplicates,return=minimal',
  };
  const nextIds = new Set(value.map((item) => item.id));
  const removedIds = previous.map((item) => item.id).filter((id) => !nextIds.has(id));
  if (removedIds.length) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=in.(${encodePostgrestIds(removedIds)})`, { method: 'DELETE', headers });
    if (!res.ok) throw new Error(`Cannot delete ${table}`);
  }
  if (value.length === 0 && previous.length === 0) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=not.is.null`, { method: 'DELETE', headers });
    if (!res.ok) throw new Error(`Cannot clear ${table}`);
    return;
  }
  const changed = value.filter((item) => JSON.stringify(item) !== JSON.stringify(previous.find((old) => old.id === item.id)));
  if (changed.length) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?on_conflict=id`, {
      method: 'POST',
      headers,
      body: JSON.stringify(changed),
    });
    if (!res.ok) throw new Error(`Cannot upsert ${table}`);
  }
}

async function readRemoteTable(table) {
  if (!useRemoteDb) return null;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });
  if (!res.ok) return null;
  return res.json();
}

function useRemoteList(table) {
  const [items, setItems] = useState([]);
  const [dbStatus, setDbStatus] = useState(useRemoteDb ? 'connecting' : 'missing');
  useEffect(() => {
    let alive = true;
    const sync = async () => {
      if (!useRemoteDb) {
        setDbStatus('missing');
        return;
      }
      const remote = await readRemoteTable(table);
      if (!alive) return;
      if (remote) {
        setItems(remote);
        setDbStatus('connected');
      } else {
        setDbStatus('error');
      }
    };
    sync();
    const timer = useRemoteDb ? window.setInterval(sync, 2500) : null;
    return () => {
      alive = false;
      if (timer) window.clearInterval(timer);
    };
  }, [table]);
  const setStoredItems = useCallback((next) => {
    const value = typeof next === 'function' ? next(items) : next;
    if (useRemoteDb) {
      syncRemoteTable(table, items, value)
        .then(() => setDbStatus('connected'))
        .catch(() => setDbStatus('error'));
    } else {
      setDbStatus('missing');
    }
    setItems(value);
  }, [items, table]);
  return [items, setStoredItems, dbStatus];
}

function shufflePick(seedSource, count) {
  const list = questions.map((q, index) => {
    const options = [...q[1]];
    for (let k = options.length - 1; k > 0; k--) {
      const r = Math.floor(Math.random() * (k + 1));
      [options[k], options[r]] = [options[r], options[k]];
    }
    return { id: `q${index + 1}`, text: q[0], options, answer: q[2] };
  });
  let seed = seedSource.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || Date.now();
  for (let i = list.length - 1; i > 0; i -= 1) {
    seed = (seed * 9301 + 49297) % 233280;
    const j = seed % (i + 1);
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list.slice(0, count);
}

function getQuestionById(id) {
  const index = parseInt(id.replace(/^q/i, ''), 10) - 1;
  const q = questions[index];
  if (!q) return null;
  return {
    id,
    text: q[0],
    options: q[1],
    answer: q[2],
    explanation: q[3]
  };
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('hero');
  useEffect(() => {
    const updateActive = () => {
      const anchor = window.scrollY + 140;
      const current = navItems.reduce((active, item) => {
        const section = document.getElementById(item.id);
        if (!section) return active;
        return section.offsetTop <= anchor ? item.id : active;
      }, 'hero');
      setActiveId(current);
    };
    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, []);
  const goTo = (id) => {
    setActiveId(id);
    scrollToId(id);
  };
  return (
    <header className="topbar">
      <button className={`brand ${activeId === 'hero' ? 'active' : ''}`} onClick={() => goTo('hero')} aria-label="Về đầu trang">
        <span className="brand-mark party-logo" aria-hidden="true">☭</span>
        <span className="brand-title"><span>Hành trình</span><span>Pháp quyền</span></span>
      </button>
      <nav className="desktop-nav">
        {navItems.map((item) => <button key={item.id} className={activeId === item.id ? 'active' : ''} onClick={() => goTo(item.id)}>{item.label}</button>)}
      </nav>
      <button className="mobile-toggle" onClick={() => setOpen((v) => !v)} aria-label="Mở menu">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            {navItems.map((item) => <button key={item.id} className={activeId === item.id ? 'active' : ''} onClick={() => { goTo(item.id); setOpen(false); }}>{item.label}</button>)}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection({ onStartJourney, journeyStarted }) {
  return (
    <section id="hero" className="hero-section">
      <img src={heroImage} alt="" className="hero-bg" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <span className="eyebrow">MLN131 - Nhóm 3</span>
          <h1><span>Hành trình</span><span>Pháp quyền</span></h1>
          <p>Mô hình tương tác về Dân chủ XHCN, Nhà nước pháp quyền Việt Nam và cơ chế vận hành quyền lực trong thời đại số.</p>
          <div className="hero-actions">
            <button className="primary-btn" onClick={onStartJourney} aria-expanded={journeyStarted} aria-controls="state-diagram">
              <Play size={18} fill="currentColor" /> Bắt đầu hành trình
            </button>
            <button className="ghost-btn" onClick={() => window.open(`${window.location.origin}${window.location.pathname}?game=1`, '_blank', 'noopener,noreferrer')}>Mở cửa sổ game</button>
          </div>
          <div className="fact-row">
            <span><ShieldCheck size={16} /> Quyền lực thuộc về Nhân dân</span>
            <span><Network size={16} /> Phân công, phối hợp, kiểm soát</span>
          </div>
        </motion.div>

        <motion.div className="hero-drum-stage" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="radial-hub hero-drum-only">
            <img className="real-drum-photo" src={drumPhotoUrl} alt="Mặt trống đồng Ngọc Lũ, nguồn Bảo tàng Lịch sử Quốc gia" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StateDiagramSection() {
  return (
    <motion.section
      id="state-diagram"
      className="state-diagram-section"
      style={{ '--page-bg': `url("${page2Bg}")` }}
      initial={{ opacity: 0, y: 56 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="state-diagram-frame glass-card">
        <img src={stateDiagramImage} alt="Sơ đồ bộ máy nhà nước trước và sau ngày 01.07.2025" />
      </div>
    </motion.section>
  );
}

function PartySection() {
  const [open, setOpen] = useState(0);
  return (
    <section id="party" className="section page-bg-section page3-section" style={{ '--page-bg': `url("${page3Bg}")` }}>
      <div className="section-grid two">
        <div>
          <span className="eyebrow red">Điều 4 Hiến pháp 2013</span>
          <h2>Đảng lãnh đạo bằng đường lối, Nhà nước quản lý bằng pháp luật</h2>
         
        </div>
        <div className="glass-card party-panel">
          {partyMechanisms.map((item, index) => (
            <div className={`accordion-item ${open === index ? 'open' : ''}`} key={item.title}>
              <button className="mechanism-row" onClick={() => setOpen(open === index ? -1 : index)}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.title}</strong>
                {open === index ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
              <AnimatePresence>
                {open === index && (
                  <motion.div className="accordion-body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    <p>{item.body}</p>
                    <small>{item.evidence}</small>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BranchSourceContent({ activeId }) {
  if (activeId === 'quochoi') {
    return (
      <div className="source-image-frame">
        <img src={verificationImage} alt="Ghi chú kiểm chứng Quốc hội" />
      </div>
    );
  }

  const content = branchVerificationContent[activeId];
  if (content) {
    return (
      <div className="source-evidence-card">
        <h4>{content.title}</h4>
        <p className="source-evidence-lead">{content.lead}</p>
        <div className="source-evidence-grid">
          {content.points.map(([title, body], index) => (
            <article key={title} className="source-evidence-point">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <strong>{title}</strong>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="source-list">
      {officialNotes.map((note) => <p key={note}><ClipboardCheck size={16} /> {note}</p>)}
    </div>
  );
}

function BranchesSection() {
  const [activeId, setActiveId] = useState('quochoi');
  const [view, setView] = useState('structure');
  const [selectedOrgIndex, setSelectedOrgIndex] = useState(0);
  const active = stateBranches.find((branch) => branch.id === activeId) || stateBranches[0];
  const ActiveIcon = active.icon;
  const activeOrg = active.structure[selectedOrgIndex] || active.structure[0];
  useEffect(() => {
    setSelectedOrgIndex(0);
  }, [activeId, view]);
  return (
    <section id="branches" className="section light-band page-bg-section page4-section" style={{ '--page-bg': `url("${page4Bg}")` }}>
      <div className="section-head center">
        <span className="eyebrow">Bộ máy nhà nước - cập nhật tháng 7/2026</span>
        <h2>Quyền lực nhà nước là thống nhất</h2>
       
      </div>
      <div className="branch-tabs">
        {stateBranches.map((branch) => {
          const Icon = branch.icon;
          return <button key={branch.id} className={activeId === branch.id ? 'active' : ''} onClick={() => setActiveId(branch.id)} style={{ '--accent': branch.color }}><Icon size={18} /> {branch.title}</button>;
        })}
      </div>
      <div className="branch-mode">
        <button className={view === 'structure' ? 'active' : ''} onClick={() => setView('structure')}>Cấu trúc</button>
        <button className={view === 'workflow' ? 'active' : ''} onClick={() => setView('workflow')}>Luồng vận hành</button>
        <button className={view === 'sources' ? 'active' : ''} onClick={() => setView('sources')}>Thực tế</button>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={`${active.id}-${view}`} className="branch-showcase glass-card" style={{ '--accent': active.color }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
          <div className="branch-visual">
            <ActiveIcon size={44} />
            <h3>{active.title}</h3>
            <span>{active.role}</span>
            <p>{active.summary}</p>
          </div>
          <div className="branch-detail">
            {view === 'structure' && (
              <div className="org-explorer">
                <div className="org-list">
                  {active.structure.map(([name, desc], index) => (
                    <button
                      key={name}
                      className={selectedOrgIndex === index ? 'active' : ''}
                      onClick={() => setSelectedOrgIndex(index)}
                      type="button"
                    >
                      <strong>{name}</strong>
                      <span>{desc}</span>
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${active.id}-${selectedOrgIndex}`}
                    className="org-detail-card"
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.22 }}
                  >
                    <span>Chi tiết cấu trúc</span>
                    <h4>{activeOrg[0]}</h4>
                    <p>{activeOrg[1]}</p>
                    <div className="org-detail-grid">
                      <div>
                        <b>Vai trò trong bộ máy</b>
                        <small>{active.role} - thuộc nhóm {active.title} trong mô hình quyền lực nhà nước thống nhất.</small>
                      </div>
                      <div>
                        <b>Liên hệ vận hành</b>
                        <small>{active.workflow[Math.min(selectedOrgIndex, active.workflow.length - 1)]}</small>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
            {view === 'workflow' && (
              <div className="workflow-rail">
                {active.workflow.map((step, index) => <div key={step}><span>{index + 1}</span><strong>{step}</strong></div>)}
              </div>
            )}
            {view === 'sources' && <BranchSourceContent activeId={active.id} />}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function FeedbackPortal() {
  const [items, setItems, dbStatus] = useRemoteList('hpq_feedback');
  const [draft, setDraft] = useState('Luật Bảo vệ dữ liệu cá nhân');
  const [content, setContent] = useState('');
  const visibleItems = [...items].sort((a, b) => new Date(b.createdAt || b.at || 0) - new Date(a.createdAt || a.at || 0));
  const addFeedback = () => {
    if (!content.trim()) return;
    const now = new Date();
    setItems((prev) => [
      {
        id: crypto.randomUUID(),
        draft,
        content: content.trim(),
        status: 'received',
        createdAt: now.toISOString(),
        timeline: [{ label: 'Tiếp nhận ý kiến', at: now.toLocaleString('vi-VN') }],
      },
      ...prev,
    ]);
    setContent('');
  };
  const updateStatus = (id, status, label) => {
    setItems((prev) => prev.map((item) => {
      if (item.id !== id) return item;
      if (['accepted', 'explained'].includes(item.status)) return item;
      if (status === 'reviewing' && item.status !== 'received') return item;
      if (['accepted', 'explained'].includes(status) && item.status !== 'reviewing') return item;
      return { ...item, status, timeline: [...(item.timeline || []), { label, at: new Date().toLocaleString('vi-VN') }] };
    }));
  };
  const deleteResolvedFeedback = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id || !['accepted', 'explained'].includes(item.status)));
  };
  const statusLabel = { received: 'Đã tiếp nhận', reviewing: 'Đang xử lý', accepted: 'Đã tiếp thu', explained: 'Có giải trình' };
  return (
    <section id="feedback" className="section feedback-section page-bg-section page5-section" style={{ '--page-bg': `url("${page5Bg}")` }}>
      <div className="section-head">
        <span className="eyebrow cyan">Cơ chế giải trình</span>
        <h2>Cổng tiếp nhận ý kiến Nhân dân</h2>
        
      </div>
      <div className="feedback-layout">
        <div className="glass-card feedback-form">
          <label>Dự thảo đang lấy ý kiến</label>
          <select value={draft} onChange={(e) => setDraft(e.target.value)}>
            <option>Luật Bảo vệ dữ liệu cá nhân</option>
            <option>Cải cách thủ tục hành chính số</option>
            <option>Cơ chế giám sát quyền lực nhà nước</option>
          </select>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Nhập ý kiến của người tham gia..." />
          <button className="primary-btn" onClick={addFeedback}><MessageSquareText size={17} /> Gửi vào quy trình</button>
        </div>
        <div className="feedback-stack">
          <div className="feedback-list-head">
            <div>
              <strong>Danh sách ý kiến</strong>
              <span>{visibleItems.length} hồ sơ đang ghi nhận</span>
            </div>
            <DbStatusBadge status={dbStatus} />
          </div>
          {visibleItems.length === 0 && <div className="glass-card empty-state">Chưa có ý kiến nào. Hãy nhập một ý kiến để thấy quy trình xử lý thật.</div>}
          {visibleItems.map((item) => (
            <motion.div className="glass-card feedback-item" key={item.id} layout>
              <div className="feedback-meta">
                <span>{statusLabel[item.status]}</span>
                <small>{item.createdAt ? new Date(item.createdAt).toLocaleString('vi-VN') : ''}</small>
              </div>
              <strong>{item.draft}</strong>
              <p>{item.content}</p>
              {!['accepted', 'explained'].includes(item.status) && (
                <div className="feedback-actions">
                  {item.status === 'received' && <button onClick={() => updateStatus(item.id, 'reviewing', 'Chuyển chuyên viên xử lý')}>Chờ xử lý</button>}
                  <button disabled={item.status !== 'reviewing'} onClick={() => updateStatus(item.id, 'accepted', 'Tiếp thu vào báo cáo tổng hợp')}>Tiếp thu</button>
                  <button disabled={item.status !== 'reviewing'} onClick={() => updateStatus(item.id, 'explained', 'Không tiếp thu và ghi nhận giải trình')}>Có giải trình</button>
                </div>
              )}
              {item.status === 'accepted' && <div className="final-status accepted">Kết thúc: ý kiến đã được tiếp thu.</div>}
              {item.status === 'explained' && <div className="final-status explained">Kết thúc: không tiếp thu và đã ghi nhận giải trình.</div>}
              {['accepted', 'explained'].includes(item.status) && (
                <button className="feedback-delete" onClick={() => deleteResolvedFeedback(item.id)}>
                  <Trash2 size={15} /> Xóa hồ sơ đã xử lý
                </button>
              )}
              <ol className="timeline">
                {(item.timeline || []).slice(-3).map((event, index) => <li key={`${event.label}-${index}`}><b>{event.label}</b><small>{event.at}</small></li>)}
              </ol>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const wrongOptionsList = Object.entries(data.wrongOptions || {})
      .sort((a, b) => b[1] - a[1]);
    return (
      <div className="custom-tooltip glass-card" style={{ padding: '14px', maxWidth: '320px', color: '#1f2937' }}>
        <p style={{ margin: 0, fontWeight: 900, color: '#c1121f', fontSize: '0.85rem' }}>{data.name}</p>
        <p style={{ margin: '4px 0 8px 0', fontWeight: 800, fontSize: '0.92rem', lineHeight: '1.4', color: '#1f2937' }}>{data.questionText}</p>
        <p style={{ margin: '0 0 6px 0', fontSize: '0.85rem', color: '#057a55', fontWeight: 750 }}>
          ✓ Đáp án đúng: <span style={{ fontWeight: 850 }}>{data.correctAnswer}</span>
        </p>
        {data.explanation && (
          <p style={{ margin: '6px 0 8px 0', padding: '10px 12px', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #3b82f6', fontSize: '0.82rem', color: '#334155', fontStyle: 'italic', lineHeight: '1.45' }}>
            {data.explanation}
          </p>
        )}
        {wrongOptionsList.length > 0 ? (
          <div style={{ fontSize: '0.85rem', color: '#c1121f' }}>
            <span style={{ fontWeight: 750 }}>✗ Đáp án sai đã chọn:</span>
            <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', listStyleType: 'disc', fontWeight: 800 }}>
              {wrongOptionsList.map(([opt, count], index) => (
                <li key={opt} style={{ margin: '2px 0' }}>
                  {opt} <span style={{ fontWeight: 500, color: '#64748b' }}>({count} lượt)</span>
                  {index === 0 && <span style={{ color: '#da251d', fontWeight: 900, marginLeft: '6px' }}>(Chọn nhiều nhất)</span>}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748b', fontStyle: 'italic' }}>
            (Chưa có chi tiết đáp án sai đã chọn)
          </p>
        )}
      </div>
    );
  }
  return null;
}

function QuizHost() {
  const [players, setPlayers, dbStatus] = useRemoteList('hpq_players');
  const gameUrl = `${window.location.origin}${window.location.pathname}?game=1`;
  const sorted = [...players].sort((a, b) => b.score - a.score || a.duration - b.duration);
  const wrongMap = {};
  const wrongDetailsMap = {};
  
  players.forEach((p) => {
    if (!p.wrong) return;
    p.wrong.forEach((item) => {
      let qId = "";
      let chosenOption = null;
      if (typeof item === 'string') {
        qId = item;
      } else if (item && typeof item === 'object') {
        qId = item.id;
        chosenOption = item.option;
      }
      if (!qId) return;
      
      wrongMap[qId] = (wrongMap[qId] || 0) + 1;
      if (chosenOption) {
        if (!wrongDetailsMap[qId]) {
          wrongDetailsMap[qId] = {};
        }
        wrongDetailsMap[qId][chosenOption] = (wrongDetailsMap[qId][chosenOption] || 0) + 1;
      }
    });
  });

  const chart = Object.entries(wrongMap)
    .map(([id, value]) => {
      const qInfo = getQuestionById(id);
      return {
        id,
        name: id.toUpperCase(),
        value,
        questionText: qInfo ? qInfo.text : '',
        correctAnswer: qInfo ? qInfo.answer : '',
        explanation: qInfo ? qInfo.explanation : '',
        wrongOptions: wrongDetailsMap[id] || {}
      };
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);
  return (
    <section id="quiz" className="section dark-band page-bg-section page6-section" style={{ '--page-bg': `url("${page6Bg}")` }}>
      <div className="section-head center">
        <span className="eyebrow">Đấu trường thẩm quyền</span>
        <h2>Thử tài phân loại thẩm quyền</h2>
        <p className="lead">Mỗi lượt chơi là một thử thách nhận diện đúng cơ quan, đúng quyền hạn và đúng quy trình. Điểm số giúp cả lớp thấy phần kiến thức nào còn dễ nhầm.</p>
      </div>
      <div className="quiz-host-grid">
        <div className="glass-card qr-host">
          <QRCodeSVG value={gameUrl} size={220} fgColor="#1f2937" />
          <strong>Quét mã để mở cửa sổ trò chơi</strong>
          <DbStatusBadge status={dbStatus} />
          <button className="primary-btn" onClick={() => window.open(gameUrl, '_blank', 'noopener,noreferrer')}>Vào thử thách</button>
        </div>
        <div className="glass-card leaderboard-card">
          <div className="card-head">
            <h3>Bảng xếp hạng</h3>
            <button onClick={() => setPlayers([])}><Trash2 size={15} /> Clear</button>
          </div>
          {sorted.length === 0 ? <p>Chưa có lượt chơi nào.</p> : sorted.map((p, i) => (
            <div className="rank-row" key={p.id}><strong>#{i + 1} {p.name}</strong><span>{p.score}/20 - {p.duration}s</span></div>
          ))}
        </div>
      </div>
      <div className="analytics-grid">
        <div className="glass-card chart-card">
          <h3>Thống kê câu sai nhiều nhất</h3>
          {chart.length === 0 ? <p>Chưa có dữ liệu sai. Thống kê sẽ xuất hiện sau khi có người chơi.</p> : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={chart}>
                <XAxis dataKey="name" stroke="#334155" />
                <YAxis stroke="#334155" allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>{chart.map((entry, index) => <Cell key={entry.id} fill={index === 0 ? '#c1121f' : '#d4a017'} />)}</Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="glass-card chart-card">
          <h3>Tỷ lệ đúng/sai toàn lớp</h3>
          <ResponsiveContainer width="100%" height={190}>
            <PieChart>
              <Pie data={[{ name: 'Đúng', value: players.reduce((s, p) => s + p.score, 0) }, { name: 'Sai', value: players.reduce((s, p) => s + (20 - p.score), 0) }]} dataKey="value" innerRadius={50} outerRadius={76}>
                <Cell fill="#00a6c8" />
                <Cell fill="#c1121f" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <p>{players.length} lượt chơi đã ghi nhận. Điểm cao hơn xếp trước; nếu bằng điểm thì thời gian ngắn hơn xếp trước.</p>
        </div>
      </div>
    </section>
  );
}

function GameApp() {
  const [players, setPlayers, dbStatus] = useRemoteList('hpq_players');
  const [name, setName] = useState('');
  const [startedAt, setStartedAt] = useState(null);
  const [paper, setPaper] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_SECONDS);
  const current = paper[index];
  const start = () => {
    const id = `${name}-${Date.now()}-${Math.random()}`;
    setPaper(shufflePick(id, 20));
    setStartedAt(Date.now());
    setIndex(0);
    setAnswers([]);
    setDone(false);
    setTimeLeft(QUESTION_SECONDS);
  };
  const answer = useCallback((option) => {
    if (!current || done) return;
    const correct = option === current.answer;
    const nextAnswers = [...answers, { id: current.id, correct, option }];
    setAnswers(nextAnswers);
    if (index === 19) {
      const duration = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
      const score = nextAnswers.filter((a) => a.correct).length;
      setPlayers((prev) => [...prev, { id: crypto.randomUUID(), name, score, duration, wrong: nextAnswers.filter((a) => !a.correct).map((a) => ({ id: a.id, option: a.option })), at: new Date().toISOString() }]);
      setDone(true);
    } else {
      setIndex((i) => i + 1);
    }
  }, [answers, current, done, index, name, setPlayers, startedAt]);
  useEffect(() => {
    if (!paper.length || done || !current) return undefined;
    setTimeLeft(QUESTION_SECONDS);
    const questionStartedAt = Date.now();
    const timer = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - questionStartedAt) / 1000);
      const remaining = Math.max(0, QUESTION_SECONDS - elapsed);
      setTimeLeft(remaining);
      if (remaining === 0) {
        window.clearInterval(timer);
        answer(null);
      }
    }, 250);
    return () => window.clearInterval(timer);
  }, [answer, current, done, index, paper.length]);
  const sorted = [...players].sort((a, b) => b.score - a.score || a.duration - b.duration).slice(0, 10);
  return (
    <main className="game-page" style={{ '--game-bg': `url("${page6Bg}")` }}>
      <div className="game-flag-field" aria-hidden="true">
        {Array.from({ length: 14 }, (_, flagIndex) => <span key={flagIndex} />)}
      </div>
      <section className="game-card glass-card">
        {!paper.length && (
          <>
            <div className="game-identity">
              <span className="vn-flag" aria-label="Cờ đỏ sao vàng Việt Nam"><Star size={30} fill="currentColor" /></span>
              <div>
                <strong>Hành trình Pháp quyền</strong>
                <small>Tôn trọng Hiến pháp, pháp luật và chủ quyền Việt Nam</small>
              </div>
            </div>
            <span className="eyebrow">Lượt thi thẩm quyền</span>
            <h1>Thử tài phân loại thẩm quyền</h1>
            <p>Mỗi lượt thi gồm các câu hỏi được xáo trộn để kiểm tra hiểu biết thật. Mỗi câu đúng được 1 điểm.</p>
            <div className="institution-strip">
              <span><Landmark size={16} /> Quốc hội</span>
              <span><Building2 size={16} /> Chính phủ</span>
              <span><Scale size={16} /> Tòa án & VKS</span>
              <span><MessageSquareText size={16} /> Nhân dân giám sát</span>
            </div>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tên người chơi" />
            <button className="primary-btn" disabled={!name.trim()} onClick={start}><Play size={17} /> Bắt đầu</button>
          </>
        )}
        {paper.length > 0 && !done && current && (
          <>
            <div className="question-meta"><span>Câu {index + 1}/20</span><span className={timeLeft <= 3 ? 'time-left urgent' : 'time-left'}><Timer size={15} /> {timeLeft}s</span></div>
            <h2>{current.text}</h2>
            <div className="option-grid">{current.options.map((option) => <button key={option} onClick={() => answer(option)}>{option}</button>)}</div>
          </>
        )}
        {done && (
          <>
            <span className="result good">Hoàn thành</span>
            <h1>{name}: {answers.filter((a) => a.correct).length}/20 điểm</h1>
            <p>Điểm đã được ghi vào bảng xếp hạng của trang chính.</p>
            <button className="primary-btn" onClick={() => { setPaper([]); setName(''); setDone(false); setAnswers([]); }}>Chơi lượt khác</button>
          </>
        )}
      </section>
      <aside className="game-rank glass-card">
        <div className="game-rank-head">
          <h3>Top hiện tại</h3>
          <DbStatusBadge status={dbStatus} />
        </div>
        {sorted.length === 0 ? <p>Chưa có dữ liệu.</p> : sorted.map((p, i) => <div className="rank-row" key={p.id}><strong>#{i + 1} {p.name}</strong><span>{p.score}/20 - {p.duration}s</span></div>)}
      </aside>
    </main>
  );
}

function TransparencyHub() {
  return (
    <section id="transparency" className="section">
      <div className="section-head center">
        <span className="eyebrow cyan">Minh bạch học thuật</span>
        <h2>AI chỉ là công cụ tham khảo</h2>
        <p className="lead">Nhóm tự quyết định nội dung, kiểm chứng thuật ngữ và chịu trách nhiệm thuyết trình. AI không được xem là nguồn pháp lý chính thức.</p>
      </div>
      <div className="glass-card transparency-table">
        <div className="table-row head"><span>Hạng mục</span><span>AI hỗ trợ</span><span>Nhóm thực hiện</span></div>
        {transparencyRows.map((row) => <div className="table-row" key={row[0]}>{row.map((cell) => <span key={cell}>{cell}</span>)}</div>)}
      </div>
      <div className="badge-row">
        {['Verified by team', 'Academic integrity', 'Human-reviewed content'].map((badge) => <span key={badge}><ClipboardCheck size={15} /> {badge}</span>)}
      </div>
    </section>
  );
}

export default function App() {
  const isGame = new URLSearchParams(window.location.search).get('game') === '1';
  const [showStateDiagram, setShowStateDiagram] = useState(false);

  const openStateDiagram = () => {
    setShowStateDiagram(true);
    window.setTimeout(() => scrollToId('state-diagram'), 80);
  };

  if (isGame) return <GameApp />;
  return (
    <div>
      <Navbar />
      <main>
        <HeroSection onStartJourney={openStateDiagram} journeyStarted={showStateDiagram} />
        <AnimatePresence>
          {showStateDiagram && <StateDiagramSection />}
        </AnimatePresence>
        <PartySection />
        <BranchesSection />
        <FeedbackPortal />
        <QuizHost />
        <TransparencyHub />
      </main>
      <footer className="footer">
        <strong>Hành trình Pháp quyền</strong>
        <span>MLN131 - Nhóm 3 | Không gian tương tác phục vụ thuyết trình, thảo luận và ghi nhận kết quả tham gia của lớp</span>
      </footer>
    </div>
  );
}
