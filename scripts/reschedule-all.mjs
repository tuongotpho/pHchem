import { scheduleWeek1 } from './schedule-week-1.mjs';
import { scheduleWeek2 } from './schedule-week-2.mjs';
import { scheduleWeek3 } from './schedule-week-3.mjs';
import { scheduleWeek4 } from './schedule-week-4.mjs';

async function run() {
  console.log('🌟 BẮT ĐẦU ĐẶT LỊCH LẠI TOÀN BỘ 4 TUẦN VỚI CÔNG THỨC UNICODE SIÊU ĐẸP...\n');
  await scheduleWeek1();
  console.log('\n----------------------------------------\n');
  await scheduleWeek2();
  console.log('\n----------------------------------------\n');
  await scheduleWeek3();
  console.log('\n----------------------------------------\n');
  await scheduleWeek4();
  console.log('\n🎉🎉🎉 TOÀN BỘ 28 BÀI VIẾT ĐÃ ĐƯỢC ĐẶT LỊCH THÀNH CÔNG VỚI CHUẨN UNICODE!');
}

run().catch(console.error);
