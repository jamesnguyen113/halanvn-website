// Cụm trang biến thể tôn Đông Á: /ton-dong-a/<slug>/ — mỗi trang nhắm một
// từ khóa dài ("tôn đông á 4 dem", "tôn cliplock đông á"...).
//
// KHÔNG chép số giá vào đây — mọi con số đọc trực tiếp từ prices.ts
// (đổi bảng giá là toàn cụm tự cập nhật, ngày lấy theo priceListUpdated).

import { priceGroups, priceListUpdated, fmtVnd } from './prices';

const groupOf = (id: string) => priceGroups.find((g) => g.id === id)!;
const rowPrice = (groupId: string, specPrefix: string): number | null =>
  groupOf(groupId).rows.find((r) => r.spec.startsWith(specPrefix))?.price ?? null;

const vnd = (n: number | null) => (n === null ? 'liên hệ' : `${fmtVnd(n)} đ/m`);

const p040 = rowPrice('ton-mau-dong-a', '0.40');
const p045 = rowPrice('ton-mau-dong-a', '0.45');
const p050 = rowPrice('ton-mau-dong-a', '0.50');
const pAZ100 = rowPrice('ton-lanh-trang', '0.50');
const pCliplockGiaCong = rowPrice('song-cliplock', 'Gia công');
const pCliplockDai = rowPrice('song-cliplock', 'Đai');

export interface DongAVariant {
  slug: string;
  /** tên ngắn dùng trong H1/breadcrumb, ví dụ 'Tôn Đông Á 4 dem (0.40mm)' */
  name: string;
  title: string;
  description: string;
  /** dòng giá nổi bật ngay dưới H1 (đã dựng sẵn từ prices.ts) */
  callout: string;
  /** id các nhóm giá render bằng PriceTable */
  groupIds: string[];
  intro: string[];
  faq: { q: string; a: string }[];
}

export const dongAVariants: DongAVariant[] = [
  {
    slug: '4-dem',
    name: 'Tôn Đông Á 4 dem (0.40mm)',
    title: `Giá tôn Đông Á 4 dem (0.40mm) hôm nay ${priceListUpdated} | Hà Lan`,
    description: `Tôn Đông Á 4 dem (0.40mm) dòng ĐA-S: ${vnd(p040)} đã gồm VAT, cập nhật ${priceListUpdated}. Cán sóng 5, 9, lafông, cliplock theo công trình, giao tận nơi.`,
    callout: `Giá tôn Đông Á 4 dem hôm nay: ${vnd(p040)} (dòng ĐA-S, đã gồm VAT, cập nhật ${priceListUpdated}).`,
    groupIds: ['ton-mau-dong-a'],
    intro: [
      '"Dem" (zem) là cách gọi độ dày tôn theo phần mười milimét — tôn 4 dem tức là tôn dày 0.40mm. Đây là độ dày tiết kiệm nhất trong các loại tôn màu Đông Á chính hãng, phù hợp mái nhà ở dân dụng, mái hiên, công trình thay mái tôn cũ.',
      'Tôn Đông Á 0.40mm thuộc dòng ĐA-S, in thương hiệu, độ dày và tiêu chuẩn ngay trên bề mặt tấm — kiểm tra được lúc nhận hàng. Hà Lan cán sóng 5, sóng 9, lafông 13 sóng hoặc cliplock từ cuộn tại 4 nhà máy, cắt đúng chiều dài mái.',
    ],
    faq: [
      {
        q: 'Tôn Đông Á 4 dem giá bao nhiêu 1 mét?',
        a: `Giá niêm yết ${priceListUpdated}: ${vnd(p040)} — đã gồm VAT, cán sóng theo công trình. Số lượng lớn có giá riêng, gọi hotline chốt trong ngày.`,
      },
      {
        q: 'Tôn 4 dem có đủ dày cho mái nhà ở không?',
        a: 'Mái nhà ở thông thường, bước xà gồ chuẩn (dưới 90 cm) thì 0.40mm đủ dùng. Mái khẩu độ lớn, vùng gió mạnh hoặc cần đi lại bảo trì thường xuyên nên lên 0.45mm — chênh giá không nhiều so với tổng chi phí mái.',
      },
      {
        q: 'Làm sao biết đúng tôn Đông Á 0.40mm chính hãng?',
        a: 'Xem dòng in trên bề mặt tấm tôn: thương hiệu Đông Á, độ dày 0.40mm và tiêu chuẩn công bố. Mua tại Hà Lan có hóa đơn VAT kèm theo — đo thực tế được độ dày khi nhận hàng.',
      },
    ],
  },
  {
    slug: '4-5-dem',
    name: 'Tôn Đông Á 4.5 dem (0.45mm)',
    title: `Giá tôn Đông Á 4.5 dem (0.45mm) hôm nay ${priceListUpdated} | Hà Lan`,
    description: `Tôn Đông Á 4.5 dem (0.45mm) dòng ĐA-S: ${vnd(p045)} đã gồm VAT, cập nhật ${priceListUpdated}. Độ dày được chọn nhiều nhất cho mái nhà xây mới. Cán sóng theo công trình.`,
    callout: `Giá tôn Đông Á 4.5 dem hôm nay: ${vnd(p045)} (dòng ĐA-S, đã gồm VAT, cập nhật ${priceListUpdated}).`,
    groupIds: ['ton-mau-dong-a'],
    intro: [
      'Tôn Đông Á 4.5 dem (0.45mm) là độ dày được chọn nhiều nhất cho mái nhà ở xây mới: cứng cáp hơn 4 dem rõ rệt, đi được bước xà gồ rộng hơn, chịu gió tốt hơn và ít ọp khi thi công.',
      'Cùng dòng ĐA-S chính hãng, in thương hiệu và độ dày trên tấm. Cán sóng 5, sóng 9, lafông 13 sóng, cliplock — cắt đúng chiều dài mái, giao tận công trình khu vực TP.HCM và miền Nam.',
    ],
    faq: [
      {
        q: 'Tôn Đông Á 4.5 dem giá bao nhiêu 1 mét?',
        a: `Giá niêm yết ${priceListUpdated}: ${vnd(p045)} — đã gồm VAT. Đơn số lượng lớn gọi hotline để có giá theo khối lượng.`,
      },
      {
        q: 'Nên chọn 4.5 dem hay 4 dem?',
        a: 'Xây mới đa số khách chọn 4.5 dem: mái cứng hơn, bước xà gồ thưa hơn nên phần chênh giá tôn được bù lại một phần ở chi phí xà gồ. 4 dem phù hợp thay mái cũ trên khung sẵn có bước xà gồ dày.',
      },
      {
        q: 'Có sẵn màu nào, đặt cán bao lâu có hàng?',
        a: 'Màu thông dụng (đỏ ngói, xanh ngọc, trắng sữa...) thường có cuộn sẵn tại nhà máy — cán trong ngày. Màu ít dùng báo trước 1 — 2 ngày. Gọi hotline đọc màu và số mét để hẹn lịch chính xác.',
      },
    ],
  },
  {
    slug: '5-dem',
    name: 'Tôn Đông Á 5 dem (0.50mm)',
    title: `Giá tôn Đông Á 5 dem (0.50mm) hôm nay ${priceListUpdated} | Hà Lan`,
    description: `Tôn Đông Á 5 dem (0.50mm) dòng ĐA-W bền màu: ${vnd(p050)} đã gồm VAT, cập nhật ${priceListUpdated}. Phù hợp nhà xưởng, công trình cần tuổi thọ màu dài.`,
    callout: `Giá tôn Đông Á 5 dem hôm nay: ${vnd(p050)} (dòng ĐA-W, đã gồm VAT, cập nhật ${priceListUpdated}).`,
    groupIds: ['ton-mau-dong-a', 'ton-lanh-trang'],
    intro: [
      'Tôn Đông Á 5 dem (0.50mm) trong bảng giá hiện hành thuộc dòng ĐA-W — dòng bền màu hơn của Đông Á. Độ dày 0.50mm dành cho nhà xưởng, kho, công trình cần mái cứng, tuổi thọ màu dài và chịu được bước xà gồ thưa.',
      'Nếu công trình ưu tiên chống ăn mòn tối đa mà không cần màu (nhà xưởng, gần biển), cân nhắc tôn lạnh trắng Đông Á AZ100 cùng độ dày — bảng giá bên dưới có cả hai để so sánh.',
    ],
    faq: [
      {
        q: 'Tôn Đông Á 5 dem giá bao nhiêu 1 mét?',
        a: `Giá niêm yết ${priceListUpdated}: ${vnd(p050)} (dòng ĐA-W) — đã gồm VAT. Khối lượng nhà xưởng gọi hotline để có đơn giá theo hợp đồng.`,
      },
      {
        q: 'ĐA-W khác gì ĐA-S?',
        a: 'Theo công bố của Đông Á, ĐA-W là dòng cao cấp hơn về độ bền màu sơn so với ĐA-S. Trong bảng giá hiện hành của Hà Lan, độ dày 0.40 — 0.45mm là ĐA-S, độ dày 0.50mm là ĐA-W.',
      },
      {
        q: 'Mái xưởng nên dùng tôn màu 5 dem hay tôn lạnh AZ100?',
        a: 'Cần thẩm mỹ màu sắc: tôn màu 5 dem. Cần chống ăn mòn tối đa, khu vực ven biển/hóa chất nhẹ và chấp nhận mái trắng bạc: tôn lạnh AZ100. Giá hai loại chênh nhau ít — xem bảng trên trang này.',
      },
    ],
  },
  {
    slug: 'az100',
    name: 'Tôn lạnh Đông Á AZ100',
    title: `Giá tôn lạnh Đông Á AZ100 hôm nay ${priceListUpdated} | Hà Lan`,
    description: `Tôn lạnh trắng Đông Á AZ100 (0.50mm): ${vnd(pAZ100)} đã gồm VAT, cập nhật ${priceListUpdated}. Mạ nhôm kẽm chống ăn mòn cao — nhà xưởng, khu vực ven biển.`,
    callout: `Giá tôn lạnh Đông Á AZ100 (0.50mm) hôm nay: ${vnd(pAZ100)} (đã gồm VAT, cập nhật ${priceListUpdated}).`,
    groupIds: ['ton-lanh-trang', 'ton-mau-dong-a'],
    intro: [
      'AZ100 là mức phủ hợp kim nhôm kẽm 100 g/m² — lớp mạ chống ăn mòn cao hơn tôn kẽm thường, giữ mái bền ở môi trường nhà xưởng, gần biển hoặc có hơi hóa chất nhẹ. Tôn lạnh Đông Á AZ100 bề mặt trắng bạc, phản xạ nhiệt tốt nên mái cũng mát hơn tôn tối màu.',
      'Hà Lan cán tôn lạnh Đông Á từ cuộn: sóng 5, sóng 9, lafông, cliplock — như tôn màu. Cần so sánh với tôn màu Đông Á cùng độ dày, xem bảng giá thứ hai bên dưới.',
    ],
    faq: [
      {
        q: 'Tôn lạnh Đông Á AZ100 giá bao nhiêu?',
        a: `Giá niêm yết ${priceListUpdated}: ${vnd(pAZ100)} cho độ dày 0.50mm — đã gồm VAT, cán sóng theo công trình.`,
      },
      {
        q: 'AZ100 nghĩa là gì, khác tôn kẽm thường chỗ nào?',
        a: 'AZ100 = lượng phủ hợp kim nhôm kẽm 100 g/m² trên hai mặt. Lớp nhôm kẽm bền ăn mòn hơn lớp kẽm thuần cùng khối lượng — nên tôn lạnh trắng thường được chọn cho nhà xưởng và khu vực gần biển thay tôn kẽm.',
      },
      {
        q: 'Tôn lạnh có sơn màu được không?',
        a: 'Tôn lạnh trắng dùng trần (không sơn màu). Nếu cần màu, chọn tôn màu Đông Á — nền cũng là thép mạ nhôm kẽm, thêm lớp sơn phủ. Cần tư vấn theo môi trường công trình, gọi hotline.',
      },
    ],
  },
  {
    slug: 'cliplock',
    name: 'Tôn cliplock Đông Á',
    title: `Giá tôn cliplock Đông Á hôm nay ${priceListUpdated} — không bắn vít | Hà Lan`,
    description: `Tôn cliplock Đông Á: giá tôn theo độ dày + gia công cán cliplock ${pCliplockGiaCong ? fmtVnd(pCliplockGiaCong) + ' đ/m' : 'liên hệ'}. Mái không bắn vít, chống dột tối đa. Cập nhật ${priceListUpdated}.`,
    callout: `Tôn cliplock Đông Á = giá tôn màu theo độ dày (bảng dưới) + gia công cán sóng cliplock ${pCliplockGiaCong ? fmtVnd(pCliplockGiaCong) + ' đ/m' : '(liên hệ)'} + đai kẹp ${pCliplockDai ? fmtVnd(pCliplockDai) + ' đ/cái' : '(liên hệ)'} — cập nhật ${priceListUpdated}.`,
    groupIds: ['ton-mau-dong-a', 'song-cliplock'],
    intro: [
      'Cliplock là kiểu sóng khớp âm dương: tấm tôn bấm vào đai kẹp bắt sẵn trên xà gồ, không bắn vít xuyên qua mặt tôn — loại bỏ điểm dột phổ biến nhất của mái tôn thường. Phù hợp mái nhà xưởng yêu cầu chống dột cao và mái dốc thấp.',
      'Giá tôn cliplock Đông Á tính đơn giản: giá tôn màu Đông Á theo độ dày bạn chọn (0.45mm trở lên khuyến nghị cho cliplock) cộng phí gia công cán sóng cliplock và đai kẹp — cả ba số đều trong bảng giá bên dưới.',
    ],
    faq: [
      {
        q: 'Giá tôn cliplock Đông Á tính thế nào?',
        a: `Lấy giá tôn màu Đông Á theo độ dày (ví dụ 0.45mm: ${vnd(p045)}) cộng gia công cán cliplock ${pCliplockGiaCong ? fmtVnd(pCliplockGiaCong) + ' đ/m' : 'liên hệ'} và đai kẹp ${pCliplockDai ? fmtVnd(pCliplockDai) + ' đ/cái' : 'liên hệ'}. Đọc diện tích mái qua hotline — nhà máy tính trọn gói ngay.`,
      },
      {
        q: 'Mái cliplock có thật sự không dột không?',
        a: 'Không có lỗ vít xuyên mặt tôn nên loại bỏ nguyên nhân dột chính. Mái vẫn cần thi công đúng: đai kẹp bắt thẳng hàng, độ dốc tối thiểu theo khuyến cáo, xử lý úp nóc và máng xối chuẩn.',
      },
      {
        q: 'Tôn dày bao nhiêu thì cán được cliplock?',
        a: 'Cán được từ 0.40mm, nhưng khuyến nghị 0.45 — 0.50mm để sóng khớp cứng cáp, bấm đai chắc và đi lại bảo trì an toàn hơn. Đông Á 0.45mm (ĐA-S) và 0.50mm (ĐA-W) đều cán cliplock tốt.',
      },
    ],
  },
  {
    slug: 'la-phong',
    name: 'Tôn la phông Đông Á (13 sóng)',
    title: `Giá tôn la phông Đông Á 13 sóng hôm nay ${priceListUpdated} | Hà Lan`,
    description: `Tôn la phông (lafông) 13 sóng cán từ tôn màu Đông Á chính hãng — giá theo độ dày từ ${vnd(p040)}, cập nhật ${priceListUpdated}. Đóng trần chống nóng, cắt đúng kích thước.`,
    callout: `Tôn la phông Đông Á cán từ tôn màu chính hãng — giá theo độ dày (bảng dưới), phí cán lafông 13 sóng tính trong đơn giá, cập nhật ${priceListUpdated}.`,
    groupIds: ['ton-mau-dong-a'],
    intro: [
      'Tôn la phông (lafông) 13 sóng là tôn cán sóng nhỏ, phẳng đẹp hai mặt — dùng đóng trần nhà, trần mái hiên, ốp diềm. So với trần nhựa, la phông tôn màu không ố vàng, không võng theo thời gian và chịu được vị trí ngoài trời có mái che.',
      'Hà Lan cán la phông 13 sóng từ cuộn tôn màu Đông Á chính hãng — chọn độ dày theo bảng giá dưới (trần nhà thường dùng 0.40mm là đủ), màu trắng sữa và các màu sáng được chuộng nhất. Cắt đúng chiều dài từng khoang trần.',
    ],
    faq: [
      {
        q: 'Tôn la phông Đông Á giá bao nhiêu 1 mét?',
        a: `Tính theo giá tôn màu Đông Á cùng độ dày (0.40mm: ${vnd(p040)}, đã gồm VAT) — cán lafông 13 sóng tại nhà máy. Đọc số mét và độ dày qua hotline để có tổng tiền ngay.`,
      },
      {
        q: 'Đóng trần nên dùng la phông dày bao nhiêu?',
        a: 'Trần trong nhà, khoang dưới 1.2 m: 0.40mm đủ phẳng đẹp. Khoang rộng hơn hoặc trần ngoài hiên đón gió: 0.45mm để tấm cứng, không rung ồn khi gió giật.',
      },
      {
        q: 'La phông tôn có nóng hơn trần nhựa không?',
        a: 'Bản thân tấm tôn dẫn nhiệt hơn nhựa, nhưng độ nóng của trần phụ thuộc lớp mái phía trên. Mái tôn có dán PE cách nhiệt hoặc trải túi khí thì trần la phông tôn mát tương đương trần nhựa và bền hơn nhiều.',
      },
    ],
  },
];

export const dongAVariantBySlug = new Map(dongAVariants.map((v) => [v.slug, v]));
