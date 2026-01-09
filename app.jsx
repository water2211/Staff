import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Users, TrendingUp, ArrowLeft } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell } from 'recharts';

const criteria = ['ด้านผลสัมฤทธิ์ของงาน','ความถูกต้องและคุณภาพของงาน','ความตรงต่อเวลาในการส่งมอบ','ความรับผิดชอบต่องานที่ได้รับมอบหมายจนจบ','ด้านไหวพริบและทักษะ','การแก้ไขปัญหาเฉพาะหน้า','การเรียนรู้และความรวดเร็วในการเข้าใจงาน','ความรอบคอบและการลำดับความสำคัญ','ด้านการมีส่วนร่วม การนำเสนอแนวทางปรับปรุงงาน','การทำงานร่วมกับทีม'];
const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
const teamSalesData = {
  'ทีมโอเว่น': [162084.38, 138999.12, 215911.33, 100968.51, 107570.64, 236492.85, 159750.83, 199458.34, 158166.53, 195116.64, 38369.77, 63340.87],
  'ทีมวุฒิ': [1080394.00, 835973.40, 777258.63, 736315.41, 859789.61, 676116.39, 669166.94, 562142.42, 598512.78, 678958.41, 522061.02, 370542.75],
  'ทีมเกมส์': [975975.00, 1352726.31, 1158208.08, 1424212.75, 1723713.51, 1300450.82, 1766279.81, 1504554.76, 1710253.92, 1555223.46, 1445062.49, 1735642.75]
};

const teams = [
  { name: 'ทีมโอเว่น', leader: 'โอเว่น', color: '#3b82f6', hasSales: true, members: [
    { name: 'อู๋ (ปะจิ)', scores: [10,10,9,10,10,10,10,10,7,10], total: 96, review: 'โดยรวมทำงานได้ดี มีไหวพริบในการแก้ปัญหา' },
    { name: 'ใบตอง', scores: [10,9,9,10,9,9,10,8,8,10], total: 92, review: 'โดยรวมทำงานได้ดี รับผิดชอบงานที่มอบหมายได้ดี' },
    { name: 'บูม', scores: [10,9,9,10,8,6,7,7,5,10], total: 81, review: 'เขียนโค้ดกับทำสคริปต์ทำได้ดี มีไอเดียสร้างสรรค์' },
    { name: 'บอส', scores: [10,9,9,10,8,6,7,7,5,10], total: 81, review: 'เขียนโค้ดกับทำสคริปต์ทำได้ดี' },
    { name: 'เจษ', scores: [10,9,9,10,8,6,7,6,5,10], total: 80, review: 'มีไอเดียสร้างสรรค์ดี ทำงานที่มอบหมายได้ดี' },
    { name: 'ไปท์', scores: [6,6,6,6,5,5,5,4,4,8], total: 55, review: 'เรียนรู้ยังค่อนข้างช้า ต้องปรับปรุง' }
  ]},
  { name: 'ทีมวุฒิ', leader: 'วุฒิ', color: '#10b981', hasSales: true, members: [
    { name: 'ปราย', scores: [10,10,10,10,9,9,10,9,9,10], total: 96, review: 'งานที่ได้รับมอบหมายสามารถทำได้ค่อนข้างดี' },
    { name: 'ฟอร์ด', scores: [10,10,10,10,10,10,10,9,9,10], total: 98, review: 'การทำงานมีความละเอียดรอบคอบ เข้าใจงานได้ดี' }
  ]},
  { name: 'ทีมเกมส์', leader: 'เกมส์', color: '#a855f7', hasSales: true, members: [
    { name: 'อ๊อฟ', scores: [8,7,9,10,8,7,7,7,7,10], total: 80, review: 'ตอบลูกค้าพื้นฐานได้ดีมาก มีความทุ่มเท' },
    { name: 'องุ่น', scores: [9,8,10,10,9,9,9,10,9,10], total: 93, review: 'จัดการสินค้าบัญชี BM Nolimit ได้ดี' },
    { name: 'เบนซ์', scores: [10,9,10,10,10,10,10,10,10,10], total: 99, review: 'จัดการงานหลังบ้านได้ดีมาก' },
    { name: 'เชอรี่', scores: [8,7,10,10,7,7,7,7,7,10], total: 80, review: 'จัดการสินค้า Mbasic ได้ค่อนข้างดี' }
  ]},
  { name: 'ทีมก็อต (Graphic)', leader: 'ก็อต', color: '#f97316', hasSales: false, members: [
    { name: 'พี่ยอด', scores: [10,10,10,10,10,10,10,10,10,10], total: 87.5, review: 'ตัดคลิปเล่าสตอรี่ได้ดี' },
    { name: 'ทิพย์', scores: [8,8,9,10,8.5,9,9,8,9,9], total: 84.5, review: 'ทำงานกราฟิกได้ดี' },
    { name: 'อุ้ม', scores: [7.5,8,7,7.5,7.5,7,8,7.5,5,7], total: 72, review: 'ยังต้องพัฒนาในหลายด้าน' }
  ]},
  { name: 'ทีมทิว (Dev)', leader: 'ทิว', color: '#f43f5e', hasSales: false, members: [
    { name: 'บอส', scores: [10,9,8,9.5,8,8,7,8,7,8], total: 82.5, review: 'ถนัด Automation และ Backend' },
    { name: 'บูม', scores: [10,9,8,10,9,9,10,8,8.5,8], total: 89.5, review: 'มีไหวพริบในการทำงานที่ดี' }
  ]}
];

const workMembers = [
  { name: 'น้ำ', team: 'MD', color: '#0d9488', start: '03-05-2020', years: 5, months: 8, salary: 43923, bonus: 219615 },
  { name: 'อิ่ม', team: 'Office', color: '#0d9488', start: '05-07-2020', years: 5, months: 6, salary: 32802, bonus: 164010 },
  { name: 'วุฒิ', team: 'หัวหน้าทีม', color: '#475569', start: '01-09-2021', years: 4, months: 4, salary: 21961.50, bonus: 87846 },
  { name: 'เกมส์', team: 'หัวหน้าทีม', color: '#475569', start: '19-09-2022', years: 3, months: 3, salary: 19965, bonus: 59895 },
  { name: 'ทิว', team: 'หัวหน้าทีม', color: '#475569', start: '01-09-2023', years: 2, months: 4, salary: 18150, bonus: 36300 },
  { name: 'โอเว่น', team: 'หัวหน้าทีม', color: '#475569', start: '01-09-2023', years: 2, months: 4, salary: 18150, bonus: 36300 },
  { name: 'ก็อต', team: 'หัวหน้าทีม', color: '#475569', start: '27-02-2024', years: 1, months: 10, salary: 16500, bonus: 16500 },
  { name: 'แมน', team: 'ทีมโอเว่น', color: '#3b82f6', start: '10-03-2024', years: 1, months: 9, salary: 15000, bonus: 15000, warning: true },
  { name: 'เชอรรี่', team: 'ทีมเกมส์', color: '#a855f7', start: '20-04-2024', years: 1, months: 8, salary: 16500, bonus: 16500 },
  { name: 'อ๊อฟ', team: 'ทีมเกมส์', color: '#a855f7', start: '25-04-2024', years: 1, months: 8, salary: 16500, bonus: 16500 },
  { name: 'ฟอร์ด', team: 'ทีมวุฒิ', color: '#10b981', start: '24-08-2024', years: 1, months: 4, salary: 10300, bonus: 10300 },
  { name: 'ปะจิ', team: 'ทีมเกมส์', color: '#a855f7', start: '19-08-2024', years: 1, months: 4, salary: 16500, bonus: 16500 },
  { name: 'เบนซ์', team: 'ทีมเกมส์', color: '#a855f7', start: '20-08-2024', years: 1, months: 4, salary: 16500, bonus: 16500, warning: true },
  { name: 'ใบตอง', team: 'ทีมเกมส์', color: '#a855f7', start: '19-08-2024', years: 1, months: 4, salary: 16500, bonus: 16500 },
  { name: 'ปาย', team: 'ทีมก็อต', color: '#f97316', start: '05-09-2024', years: 1, months: 4, salary: 16500, bonus: 16500 },
  { name: 'องุ่น', team: 'ทีมวุฒิ', color: '#10b981', start: '21-12-2024', years: 1, months: 0, salary: 15000, bonus: 7500 },
  { name: 'ทิพย์', team: 'ทีมก็อต', color: '#f97316', start: '16-02-2025', years: 0, months: 10, salary: 15000, bonus: 7500 },
  { name: 'ยอด', team: 'ทีมก็อต', color: '#f97316', start: '03-02-2025', years: 0, months: 11, salary: 15000, bonus: 7500 },
  { name: 'เจษ', team: 'ทีมโอเว่น', color: '#3b82f6', start: '01-03-2025', years: 0, months: 10, salary: 15000, bonus: 7500 },
  { name: 'อุ้ม', team: 'ทีมก็อต', color: '#f97316', start: '01-04-2025', years: 0, months: 9, salary: 15000, bonus: 7500 },
  { name: 'บอส', team: 'ทีมทิว', color: '#f43f5e', start: '01-04-2025', years: 0, months: 9, salary: 15000, bonus: 7500 },
  { name: 'บูม', team: 'ทีมทิว', color: '#f43f5e', start: '01-04-2025', years: 0, months: 9, salary: 15000, bonus: 7500 },
  { name: 'ปอ', team: 'ทีมโอเว่น', color: '#3b82f6', start: '05-07-2025', years: 0, months: 6, salary: 15000, bonus: 7500 },
  { name: 'ไปป์', team: 'ทีมโอเว่น', color: '#3b82f6', start: '10-11-2025', years: 0, months: 1, salary: 13500, bonus: 0 }
];

const attendanceData = [
  { name: 'น้ำ', late: 0, lateMin: 0, sick: 1, personal: 2, vacation: 0, absent: 0 },
  { name: 'อิ่ม', late: 0, lateMin: 0, sick: 3, personal: 11, vacation: 0, absent: 0 },
  { name: 'วุฒิ', late: 132, lateMin: 2579, sick: 17, personal: 3, vacation: 3, absent: 2 },
  { name: 'ปราย', late: 2, lateMin: 5, sick: 1, personal: 1, vacation: 0, absent: 0 },
  { name: 'ทิว', late: 17, lateMin: 485, sick: 0, personal: 1, vacation: 0, absent: 0 },
  { name: 'ฟอร์ด', late: 0, lateMin: 0, sick: 0, personal: 0, vacation: 0, absent: 0 },
  { name: 'โอเว่น', late: 1, lateMin: 8, sick: 0, personal: 0, vacation: 0, absent: 0 },
  { name: 'แมน', late: 0, lateMin: 0, sick: 0, personal: 0, vacation: 0, absent: 0 },
  { name: 'อู๋', late: 2, lateMin: 9, sick: 6, personal: 0, vacation: 0, absent: 0 },
  { name: 'เกมส์', late: 85, lateMin: 1225, sick: 0, personal: 0, vacation: 3, absent: 0 },
  { name: 'เชอรรี่', late: 0, lateMin: 0, sick: 0, personal: 0, vacation: 4, absent: 0 },
  { name: 'เบนซ์', late: 23, lateMin: 125, sick: 0, personal: 5, vacation: 0, absent: 0 },
  { name: 'องุ่น', late: 1, lateMin: 18, sick: 1, personal: 0, vacation: 0, absent: 0 },
  { name: 'อ๊อฟ', late: 1, lateMin: 0, sick: 0, personal: 5, vacation: 0, absent: 0 },
  { name: 'ก็อต', late: 39, lateMin: 565, sick: 1, personal: 4, vacation: 0, absent: 0 },
  { name: 'ทิพย์', late: 57, lateMin: 442, sick: 2, personal: 0, vacation: 0, absent: 0 },
  { name: 'พี่ยอด', late: 0, lateMin: 0, sick: 0, personal: 0, vacation: 0, absent: 0 },
  { name: 'อุ้ม', late: 50, lateMin: 645, sick: 0, personal: 0, vacation: 0, absent: 0 },
  { name: 'ใบตอง', late: 26, lateMin: 535, sick: 6, personal: 3, vacation: 0, absent: 3 },
  { name: 'เจษ', late: 0, lateMin: 0, sick: 0, personal: 0, vacation: 0, absent: 0 },
  { name: 'บอส', late: 0, lateMin: 0, sick: 0, personal: 0, vacation: 0, absent: 0 },
  { name: 'บูม', late: 0, lateMin: 0, sick: 0, personal: 0, vacation: 0, absent: 0 },
  { name: 'ไปท์', late: 2, lateMin: 11, sick: 0, personal: 0, vacation: 0, absent: 0 }
];

const otData = [
  { name: 'เชอร์รี่', ot1: 292, ot2: 12, total: 304 },
  { name: 'โอเว่น', ot1: 193, ot2: 7, total: 200 },
  { name: 'ก็อต', ot1: 114, ot2: 22, total: 136 },
  { name: 'ใบตอง', ot1: 118, ot2: 18, total: 136 },
  { name: 'เบนซ์', ot1: 116, ot2: 3, total: 119 },
  { name: 'วุฒิ', ot1: 107, ot2: 6, total: 113 },
  { name: 'อู๋', ot1: 90, ot2: 21, total: 111 },
  { name: 'พี่ยอด', ot1: 73, ot2: 38, total: 111 },
  { name: 'เกมส์', ot1: 94, ot2: 7, total: 101 },
  { name: 'อ๊อฟ', ot1: 74, ot2: 18, total: 92 },
  { name: 'อุ๋ม', ot1: 69, ot2: 21, total: 90 },
  { name: 'บูม', ot1: 54, ot2: 34, total: 88 },
  { name: 'บอส', ot1: 54, ot2: 34, total: 88 },
  { name: 'องุ่น', ot1: 68, ot2: 9, total: 77 },
  { name: 'ทิพย์', ot1: 52, ot2: 22, total: 74 },
  { name: 'ฟอร์ด', ot1: 67, ot2: 2, total: 69 },
  { name: 'เจษ', ot1: 24, ot2: 32, total: 56 },
  { name: 'ทิว', ot1: 40, ot2: 7, total: 47 },
  { name: 'ปราย', ot1: 30, ot2: 4, total: 34 },
  { name: 'แมน', ot1: 15, ot2: 4, total: 19 }
];

export default function App() {
  const [slide, setSlide] = useState(0);
  const [person, setPerson] = useState(null);
  const total = 16;

  const getGrade = (s) => {
    if (s >= 90) return { g: 'A', c: '#16a34a' };
    if (s >= 80) return { g: 'B', c: '#2563eb' };
    if (s >= 70) return { g: 'C', c: '#ca8a04' };
    if (s >= 60) return { g: 'D', c: '#ea580c' };
    return { g: 'F', c: '#dc2626' };
  };

  const PersonModal = () => {
    if (!person) return null;
    const { g, c } = getGrade(person.total);
    return (
      <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:50,padding:8}} onClick={() => setPerson(null)}>
        <div style={{background:'white',borderRadius:12,width:'100%',maxWidth:400,maxHeight:'90vh',display:'flex',flexDirection:'column'}} onClick={e => e.stopPropagation()}>
          <div style={{background:person.teamColor,padding:12,borderRadius:'12px 12px 0 0'}}>
            <button onClick={() => setPerson(null)} style={{color:'white',background:'none',border:'none',cursor:'pointer',marginBottom:4}}><ArrowLeft size={16}/> กลับ</button>
            <h2 style={{color:'white',margin:0,fontSize:20}}>{person.name}</h2>
            <p style={{color:'rgba(255,255,255,0.8)',margin:0,fontSize:12}}>{person.teamName}</p>
          </div>
          <div style={{padding:12,overflow:'auto',flex:1}}>
            <div style={{display:'flex',gap:8,marginBottom:12}}>
              <div style={{flex:1,background:'#eff6ff',padding:12,borderRadius:8,textAlign:'center'}}>
                <p style={{fontSize:12,color:'#64748b',margin:0}}>คะแนน</p>
                <p style={{fontSize:24,fontWeight:'bold',color:'#2563eb',margin:0}}>{person.total}</p>
              </div>
              <div style={{flex:1,background:'#f0fdf4',padding:12,borderRadius:8,textAlign:'center'}}>
                <p style={{fontSize:12,color:'#64748b',margin:0}}>เกรด</p>
                <p style={{fontSize:24,fontWeight:'bold',color:c,margin:0}}>{g}</p>
              </div>
            </div>
            <div style={{background:'#f8fafc',padding:12,borderRadius:8,marginBottom:12}}>
              <h3 style={{fontSize:14,margin:'0 0 8px'}}>รายละเอียดคะแนน</h3>
              {criteria.map((cr, i) => {
                const sc = person.scores[i];
                const low = sc < 8;
                return (
                  <div key={i} style={{display:'flex',justifyContent:'space-between',padding:6,marginBottom:4,borderRadius:4,background:low?'#fef2f2':'white',border:`1px solid ${low?'#fca5a5':'#e2e8f0'}`}}>
                    <span style={{fontSize:11,color:low?'#b91c1c':'#334155'}}>{cr}</span>
                    <span style={{fontSize:11,fontWeight:600,color:low?'#dc2626':'#2563eb'}}>{sc}/10</span>
                  </div>
                );
              })}
            </div>
            <div style={{background:'#fefce8',padding:12,borderRadius:8}}>
              <h3 style={{fontSize:14,margin:'0 0 8px'}}>หมายเหตุ</h3>
              <p style={{fontSize:12,color:'#475569',background:'white',padding:8,borderRadius:4,margin:0}}>{person.review || '-'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Slide0 = () => (
    <div style={{height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'linear-gradient(to bottom right,#0f172a,#1e293b)',color:'white',padding:24}}>
      <div style={{fontSize:48,marginBottom:16}}>📊</div>
      <h1 style={{fontSize:28,marginBottom:12,textAlign:'center'}}>การประเมินผลพนักงาน</h1>
      <p style={{fontSize:18,color:'#94a3b8',marginBottom:24}}>ประจำปี 2025</p>
      <div style={{display:'flex',gap:8,flexWrap:'wrap',justifyContent:'center'}}>
        {teams.map((t, i) => <span key={i} style={{padding:'4px 12px',borderRadius:20,background:t.color,fontSize:12}}>{t.name}</span>)}
      </div>
    </div>
  );

  const Slide1 = () => (
    <div style={{height:'100%',background:'linear-gradient(to bottom right,#f8fafc,#f1f5f9)',padding:12,overflow:'auto'}}>
      <h2 style={{fontSize:18,fontWeight:'bold',color:'#1e293b',marginBottom:12,display:'flex',alignItems:'center',gap:8}}><Users size={18} color="#2563eb"/> ภาพรวมทีมงาน</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
        {teams.map((t, i) => (
          <div key={i} style={{background:t.color,color:'white',padding:8,borderRadius:8,cursor:'pointer'}} onClick={() => setSlide(2+i)}>
            <div style={{fontWeight:'bold',fontSize:12}}>{t.name}</div>
            <div style={{fontSize:12,opacity:0.9}}>หัวหน้า: {t.leader}</div>
            <div style={{fontSize:12,opacity:0.9}}>สมาชิก: {t.members.length} คน</div>
          </div>
        ))}
      </div>
    </div>
  );

  const TeamSlide = ({ team }) => (
    <div style={{height:'100%',background:'white',padding:12,overflow:'auto'}}>
      <div style={{background:team.color,color:'white',padding:8,borderRadius:8,marginBottom:8}}>
        <h2 style={{fontSize:18,margin:0}}>{team.name}</h2>
        <p style={{fontSize:12,margin:0,opacity:0.9}}>หัวหน้าทีม: {team.leader}</p>
      </div>
      <div style={{background:'#f8fafc',padding:8,borderRadius:8,marginBottom:8}}>
        <div style={{fontSize:12,fontWeight:600,marginBottom:8}}>สมาชิก ({team.members.length} คน)</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
          {team.members.map((m, i) => {
            const { g, c } = getGrade(m.total);
            return (
              <div key={i} style={{background:'white',padding:8,borderRadius:4,border:'1px solid #e2e8f0',cursor:'pointer'}} onClick={() => setPerson({...m,teamName:team.name,teamColor:team.color})}>
                <p style={{fontWeight:500,fontSize:12,margin:0}}>{m.name}</p>
                <span style={{fontSize:12,color:'#475569'}}>{m.total}/100 </span>
                <span style={{fontSize:12,fontWeight:'bold',color:c}}>({g})</span>
              </div>
            );
          })}
        </div>
      </div>
      {team.hasSales && teamSalesData[team.name] && (
        <div style={{background:'#f0fdf4',padding:8,borderRadius:8}}>
          <div style={{fontSize:12,fontWeight:600,marginBottom:8}}>💰 กำไรจากยอดขายปี 2568</div>
          <div style={{height:150}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={months.map((m, i) => ({ month: m, sales: teamSalesData[team.name][i] }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{fontSize:10}} />
                <YAxis tick={{fontSize:10}} tickFormatter={v => (v/1000000).toFixed(1)+'M'} width={40} />
                <Tooltip formatter={v => v.toLocaleString() + ' ฿'} />
                <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={2} dot={{r:3}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{textAlign:'center',marginTop:4}}>
            <span style={{fontSize:14,fontWeight:'bold',color:'#16a34a'}}>{teamSalesData[team.name].reduce((a,b)=>a+b,0).toLocaleString()} ฿</span>
          </div>
        </div>
      )}
    </div>
  );

  const SalesSlide = () => {
    const salesData = [
      { name: 'โอเว่น', total: 1776229.81, color: '#3b82f6' },
      { name: 'วุฒิ', total: 8367231.76, color: '#10b981' },
      { name: 'เกมส์', total: 17652303.66, color: '#a855f7' }
    ];
    return (
      <div style={{height:'100%',background:'linear-gradient(to bottom right,#f8fafc,#f1f5f9)',padding:12,overflow:'auto'}}>
        <h2 style={{fontSize:18,fontWeight:'bold',color:'#1e293b',marginBottom:12}}>💰 สรุปกำไรจากยอดขายปี 2568</h2>
        <div style={{background:'white',padding:12,borderRadius:8,marginBottom:10}}>
          <div style={{height:120}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{fontSize:12}} />
                <YAxis tick={{fontSize:10}} tickFormatter={v => (v/1000000).toFixed(0)+'M'} width={40} />
                <Tooltip formatter={v => v.toLocaleString() + ' ฿'} />
                <Bar dataKey="total" radius={[4,4,0,0]}>
                  {salesData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div style={{display:'flex',gap:6,marginBottom:10}}>
          {salesData.map((s,i) => (
            <div key={i} style={{flex:1,textAlign:'center',padding:10,background:i===0?'#dbeafe':i===1?'#dcfce7':'#f3e8ff',borderRadius:8}}>
              <p style={{fontSize:11,color:'#475569',margin:0}}>ทีม{s.name}</p>
              <p style={{fontSize:12,fontWeight:'bold',color:s.color,margin:'4px 0 0'}}>{s.total.toLocaleString()} ฿</p>
            </div>
          ))}
        </div>
        <div style={{background:'#dcfce7',padding:12,borderRadius:8,textAlign:'center'}}>
          <p style={{fontSize:12,color:'#475569',margin:0}}>รวมทั้งหมด</p>
          <p style={{fontSize:24,fontWeight:'bold',color:'#15803d',margin:0}}>27,795,765.23 ฿</p>
        </div>
      </div>
    );
  };

  const WorkSlide = () => {
    const totalSalary = workMembers.reduce((a, m) => a + m.salary, 0);
    const totalBonus = workMembers.reduce((a, m) => a + m.bonus, 0);
    return (
      <div style={{height:'100%',background:'linear-gradient(to bottom right,#f8fafc,#f1f5f9)',padding:12,overflow:'auto'}}>
        <h2 style={{fontSize:18,fontWeight:'bold',color:'#1e293b',marginBottom:12}}>📅 ตารางอายุงาน</h2>
        <div style={{background:'white',borderRadius:8,overflow:'hidden'}}>
          <table style={{width:'100%',fontSize:10,borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'#4f46e5',color:'white'}}>
                <th style={{padding:5,textAlign:'left'}}>ชื่อ</th>
                <th style={{padding:5,textAlign:'right'}}>เงินเดือน</th>
                <th style={{padding:5,textAlign:'center'}}>อายุงาน</th>
                <th style={{padding:5,textAlign:'right'}}>โบนัส</th>
              </tr>
            </thead>
            <tbody>
              {workMembers.map((m, i) => (
                <tr key={i} style={{background: m.warning ? '#fef2f2' : (i%2===0?'white':'#f8fafc'), border: m.warning ? '2px solid #ef4444' : 'none'}}>
                  <td style={{padding:4}}>{m.warning && '⚠️'}<span style={{fontWeight:500}}>{m.name}</span>
                    <div style={{background:m.color,color:'white',padding:'1px 4px',borderRadius:4,fontSize:8,display:'inline-block',marginLeft:4}}>{m.team}</div>
                  </td>
                  <td style={{padding:4,textAlign:'right',color:'#2563eb'}}>฿{m.salary.toLocaleString()}</td>
                  <td style={{padding:4,textAlign:'center'}}><span style={{background:m.years>=5?'#f3e8ff':m.years>=3?'#dbeafe':m.years>=1?'#dcfce7':'#ffedd5',color:m.years>=5?'#7c3aed':m.years>=3?'#2563eb':m.years>=1?'#16a34a':'#ea580c',padding:'2px 6px',borderRadius:10,fontSize:9,fontWeight:'bold'}}>{m.years}ปี {m.months}ด.</span></td>
                  <td style={{padding:4,textAlign:'right',color:'#16a34a',fontWeight:'bold'}}>฿{m.bonus.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{background:'#e0e7ff',fontWeight:'bold'}}>
                <td style={{padding:6}}>รวม</td>
                <td style={{padding:6,textAlign:'right',color:'#2563eb'}}>฿{totalSalary.toLocaleString()}</td>
                <td></td>
                <td style={{padding:6,textAlign:'right',color:'#16a34a'}}>฿{totalBonus.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  };

  const AttendanceSlide = () => {
    const topLate = [...attendanceData].sort((a, b) => b.late - a.late).slice(0, 5).filter(m => m.late > 0);
    const topAbsent = [...attendanceData].sort((a, b) => b.absent - a.absent).filter(m => m.absent > 0);
    return (
      <div style={{height:'100%',background:'linear-gradient(to bottom right,#f8fafc,#f1f5f9)',padding:12,overflow:'auto'}}>
        <h2 style={{fontSize:18,fontWeight:'bold',color:'#1e293b',marginBottom:12}}>📊 สถิติขาด ลา มาสาย</h2>
        <div style={{background:'white',borderRadius:8,overflow:'hidden',marginBottom:10}}>
          <table style={{width:'100%',fontSize:9,borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'#4f46e5',color:'white'}}>
                <th style={{padding:4,textAlign:'left'}}>ชื่อ</th>
                <th style={{padding:4,textAlign:'center'}}>สาย</th>
                <th style={{padding:4,textAlign:'center'}}>นาที</th>
                <th style={{padding:4,textAlign:'center'}}>ป่วย</th>
                <th style={{padding:4,textAlign:'center'}}>กิจ</th>
                <th style={{padding:4,textAlign:'center'}}>ขาด</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((m, i) => (
                <tr key={i} style={{background: i%2===0?'white':'#f8fafc'}}>
                  <td style={{padding:3,fontWeight:500}}>{m.name}</td>
                  <td style={{padding:3,textAlign:'center',color:m.late>50?'#dc2626':'inherit',fontWeight:m.late>50?'bold':'normal'}}>{m.late || '-'}</td>
                  <td style={{padding:3,textAlign:'center',color:m.lateMin>500?'#dc2626':'inherit'}}>{m.lateMin || '-'}</td>
                  <td style={{padding:3,textAlign:'center'}}>{m.sick || '-'}</td>
                  <td style={{padding:3,textAlign:'center'}}>{m.personal || '-'}</td>
                  <td style={{padding:3,textAlign:'center',color:m.absent>0?'#dc2626':'inherit',fontWeight:m.absent>0?'bold':'normal'}}>{m.absent || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
          <div style={{background:'#fee2e2',padding:8,borderRadius:8}}>
            <p style={{fontSize:11,fontWeight:'bold',color:'#dc2626',margin:'0 0 6px'}}>🚨 สายมากสุด</p>
            {topLate.map((m, i) => (
              <div key={i} style={{display:'flex',justifyContent:'space-between',fontSize:10,padding:'2px 0'}}>
                <span>{i+1}. {m.name}</span><span style={{fontWeight:'bold'}}>{m.late} วัน</span>
              </div>
            ))}
          </div>
          <div style={{background:'#fecaca',padding:8,borderRadius:8}}>
            <p style={{fontSize:11,fontWeight:'bold',color:'#b91c1c',margin:'0 0 6px'}}>❌ ขาดงาน</p>
            {topAbsent.length > 0 ? topAbsent.map((m, i) => (
              <div key={i} style={{display:'flex',justifyContent:'space-between',fontSize:10,padding:'2px 0'}}>
                <span>{i+1}. {m.name}</span><span style={{fontWeight:'bold'}}>{m.absent} วัน</span>
              </div>
            )) : <p style={{fontSize:10,color:'#64748b',margin:0}}>ไม่มี</p>}
          </div>
        </div>
      </div>
    );
  };

  const AllMembersSlide = () => {
    const allMembers = teams.flatMap(t => t.members.map(m => ({...m, teamName: t.name, teamColor: t.color}))).sort((a, b) => b.total - a.total);
    return (
      <div style={{height:'100%',background:'linear-gradient(to bottom right,#f8fafc,#f1f5f9)',padding:12,overflow:'auto'}}>
        <h2 style={{fontSize:18,fontWeight:'bold',color:'#1e293b',marginBottom:12}}>🏆 สรุปคะแนนทั้งหมด</h2>
        <div style={{background:'white',borderRadius:8,overflow:'hidden'}}>
          <table style={{width:'100%',fontSize:11,borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'#4f46e5',color:'white'}}>
                <th style={{padding:6,textAlign:'center',width:30}}>#</th>
                <th style={{padding:6,textAlign:'left'}}>ชื่อ</th>
                <th style={{padding:6,textAlign:'center'}}>คะแนน</th>
                <th style={{padding:6,textAlign:'center'}}>เกรด</th>
              </tr>
            </thead>
            <tbody>
              {allMembers.map((m, i) => {
                const {g, c} = getGrade(m.total);
                return (
                  <tr key={i} style={{background: i%2===0?'white':'#f8fafc'}}>
                    <td style={{padding:5,textAlign:'center',fontWeight:'bold',color:i<3?'#eab308':'#64748b'}}>{i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1}</td>
                    <td style={{padding:5}}><span style={{fontWeight:500}}>{m.name}</span><div style={{background:m.teamColor,color:'white',padding:'1px 4px',borderRadius:4,fontSize:8,display:'inline-block',marginLeft:4}}>{m.teamName}</div></td>
                    <td style={{padding:5,textAlign:'center',fontWeight:'bold'}}>{m.total}</td>
                    <td style={{padding:5,textAlign:'center'}}><span style={{background:g==='A'?'#dcfce7':g==='B'?'#dbeafe':'#fef9c3',color:c,padding:'2px 8px',borderRadius:10,fontWeight:'bold',fontSize:11}}>{g}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const AllScoresSlide = () => (
    <div style={{height:'100%',background:'linear-gradient(to bottom right,#f8fafc,#f1f5f9)',padding:12,overflow:'auto'}}>
      <h2 style={{fontSize:18,fontWeight:'bold',color:'#1e293b',marginBottom:12}}>📋 ตารางคะแนนรวม</h2>
      {teams.map((team, ti) => (
        <div key={ti} style={{marginBottom:12}}>
          <div style={{background:team.color,color:'white',padding:'4px 10px',borderRadius:'6px 6px 0 0',fontSize:12,fontWeight:'bold'}}>{team.name}</div>
          <div style={{background:'white',borderRadius:'0 0 6px 6px',overflow:'auto',border:`2px solid ${team.color}`,borderTop:'none'}}>
            <table style={{width:'100%',fontSize:9,borderCollapse:'collapse'}}>
              <thead>
                <tr style={{background:'#f1f5f9'}}>
                  <th style={{padding:3,textAlign:'left'}}>หัวข้อ</th>
                  {team.members.map((m, i) => <th key={i} style={{padding:3,textAlign:'center',minWidth:35}}>{m.name.substring(0,4)}</th>)}
                </tr>
              </thead>
              <tbody>
                {criteria.map((c, ci) => (
                  <tr key={ci} style={{background:ci%2===0?'white':'#fafafa'}}>
                    <td style={{padding:2,fontSize:8}}>{c.substring(0,12)}...</td>
                    {team.members.map((m, mi) => {
                      const score = m.scores[ci], isLow = score < 8;
                      return <td key={mi} style={{padding:2,textAlign:'center',background:isLow?'#fef2f2':'transparent',color:isLow?'#dc2626':'#2563eb',fontWeight:500}}>{score}</td>;
                    })}
                  </tr>
                ))}
                <tr style={{background:team.color+'20',fontWeight:'bold'}}>
                  <td style={{padding:4}}>รวม</td>
                  {team.members.map((m, mi) => {
                    const {g, c} = getGrade(m.total);
                    return <td key={mi} style={{padding:4,textAlign:'center',color:c}}>{m.total}</td>;
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );

  const BonusCalcSlide = () => {
    const calcBonus = (m) => {
      const att = attendanceData.find(a => a.name === m.name || m.name.includes(a.name)) || { lateMin: 0, sick: 0, personal: 0, absent: 0 };
      const totalMonths = m.years * 12 + m.months;
      let bonusMonths = totalMonths < 6 ? 0.5 : totalMonths < 12 ? 0.5 : totalMonths < 24 ? 1 : totalMonths < 48 ? 2.5 : totalMonths < 60 ? 4 : 5;
      const baseBonus = m.salary * bonusMonths;
      const dailyWage = m.salary / 30;
      const isExempt = m.name === 'น้ำ' || m.name === 'อิ่ม';
      const lateDed = isExempt ? 0 : att.lateMin * 1;
      const absentDed = isExempt ? 0 : att.absent * dailyWage * 5;
      const personalDed = isExempt ? 0 : att.personal * dailyWage * 3;
      const sickDed = isExempt ? 0 : att.sick * dailyWage * 1;
      const totalDed = lateDed + absentDed + personalDed + sickDed;
      const netBonus = Math.max(0, baseBonus - totalDed);
      const isPerfect = att.lateMin === 0 && att.absent === 0 && att.personal === 0 && att.sick === 0;
      return { baseBonus, lateDed, absentDed, personalDed, sickDed, totalDed, netBonus, bonusMonths, isPerfect };
    };
    const bonusData = workMembers.map(m => ({ ...m, ...calcBonus(m) }));
    const totalBase = bonusData.reduce((a, b) => a + b.baseBonus, 0);
    const totalNet = bonusData.reduce((a, b) => a + b.netBonus, 0);

    return (
      <div style={{height:'100%',background:'linear-gradient(to bottom right,#f8fafc,#f1f5f9)',padding:12,overflow:'auto'}}>
        <h2 style={{fontSize:18,fontWeight:'bold',color:'#1e293b',marginBottom:8}}>💵 คำนวณโบนัสสุทธิ</h2>
        <div style={{background:'#e0e7ff',padding:6,borderRadius:6,marginBottom:8,fontSize:8}}>
          <b>เงื่อนไข:</b> &lt;6ด.=0.5 | 1-2ปี=1 | 2-4ปี=2.5 | 4-5ปี=4 | 5ปี+=5 เดือน | <b>หัก:</b> สาย=1฿/นาที | ขาด=x5 | กิจ=x3 | ป่วย=x1
        </div>
        <div style={{background:'white',borderRadius:8,overflow:'hidden'}}>
          <table style={{width:'100%',fontSize:9,borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'#7c3aed',color:'white'}}>
                <th style={{padding:4,textAlign:'left'}}>ชื่อ</th>
                <th style={{padding:4,textAlign:'right'}}>โบนัสเดิม</th>
                <th style={{padding:4,textAlign:'right'}}>หักรวม</th>
                <th style={{padding:4,textAlign:'right',background:'#16a34a'}}>สุทธิ</th>
              </tr>
            </thead>
            <tbody>
              {bonusData.map((m, i) => (
                <tr key={i} style={{background: m.warning ? '#fef2f2' : m.isPerfect ? '#f0fdf4' : i%2===0?'white':'#f8fafc', border: m.warning ? '2px solid #ef4444' : 'none'}}>
                  <td style={{padding:4}}>{m.warning && '⚠️'}{m.isPerfect && '⭐'}<span style={{fontWeight:500}}>{m.name}</span></td>
                  <td style={{padding:4,textAlign:'right',color:'#2563eb'}}>฿{m.baseBonus.toLocaleString(undefined,{maximumFractionDigits:0})}</td>
                  <td style={{padding:4,textAlign:'right',color:m.totalDed>0?'#dc2626':'#9ca3af'}}>{m.totalDed>0?`-฿${m.totalDed.toLocaleString(undefined,{maximumFractionDigits:0})}`:'-'}</td>
                  <td style={{padding:4,textAlign:'right',fontWeight:'bold',color:'#16a34a',background:'#f0fdf4'}}>฿{m.netBonus.toLocaleString(undefined,{maximumFractionDigits:0})}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{background:'#7c3aed',color:'white',fontWeight:'bold'}}>
                <td style={{padding:6}}>รวม</td>
                <td style={{padding:6,textAlign:'right'}}>฿{totalBase.toLocaleString(undefined,{maximumFractionDigits:0})}</td>
                <td></td>
                <td style={{padding:6,textAlign:'right',background:'#16a34a'}}>฿{totalNet.toLocaleString(undefined,{maximumFractionDigits:0})}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  };

  const OTSlide = () => {
    const sorted = [...otData].sort((a, b) => b.total - a.total);
    const totalOT = sorted.reduce((a, b) => a + b.total, 0);
    return (
      <div style={{height:'100%',background:'linear-gradient(to bottom right,#f8fafc,#f1f5f9)',padding:12,overflow:'auto'}}>
        <h2 style={{fontSize:18,fontWeight:'bold',color:'#1e293b',marginBottom:8}}>⏰ สรุป OT ปี 2568</h2>
        <div style={{background:'#fef3c7',padding:8,borderRadius:8,marginBottom:10}}>
          <p style={{fontSize:11,fontWeight:'bold',color:'#92400e',margin:'0 0 6px'}}>🏆 Top 5</p>
          <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
            {sorted.slice(0,5).map((m, i) => (
              <span key={i} style={{background:i===0?'#fbbf24':i===1?'#9ca3af':i===2?'#cd7c2f':'white',color:i<3?'white':'#1e293b',padding:'4px 8px',borderRadius:12,fontSize:10,fontWeight:'bold'}}>
                {i===0?'🥇':i===1?'🥈':i===2?'🥉':`${i+1}.`} {m.name} ({m.total}ชม.)
              </span>
            ))}
          </div>
        </div>
        <div style={{background:'white',borderRadius:8,overflow:'hidden'}}>
          <table style={{width:'100%',fontSize:10,borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'#f59e0b',color:'white'}}>
                <th style={{padding:5,textAlign:'center'}}>#</th>
                <th style={{padding:5,textAlign:'left'}}>ชื่อ</th>
                <th style={{padding:5,textAlign:'right'}}>OT</th>
                <th style={{padding:5,textAlign:'right'}}>พิเศษ</th>
                <th style={{padding:5,textAlign:'right',background:'#d97706'}}>รวม</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((m, i) => (
                <tr key={i} style={{background:i<5?'#fffbeb':i%2===0?'white':'#f8fafc'}}>
                  <td style={{padding:4,textAlign:'center',fontWeight:'bold',color:i<3?'#f59e0b':'#64748b'}}>{i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1}</td>
                  <td style={{padding:4,fontWeight:i<5?'bold':'normal'}}>{m.name}</td>
                  <td style={{padding:4,textAlign:'right',color:'#2563eb'}}>{m.ot1}</td>
                  <td style={{padding:4,textAlign:'right',color:'#7c3aed'}}>{m.ot2}</td>
                  <td style={{padding:4,textAlign:'right',fontWeight:'bold',color:'#d97706',background:'#fef3c7'}}>{m.total}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{background:'#f59e0b',color:'white',fontWeight:'bold'}}>
                <td colSpan={4} style={{padding:6}}>รวมทั้งหมด</td>
                <td style={{padding:6,textAlign:'right',background:'#d97706'}}>{totalOT} ชม.</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  };

  const AwardsSlide = () => {
    const totalProfit = 27795765.23;
    const kpiBonus = totalProfit * 0.001;
    const awards = [
      { title: '🏆 ไม่สาย ไม่ขาด ไม่ลา', color: '#16a34a', bg: '#dcfce7', winners: ['ฟอร์ด', 'แมน', 'พี่ยอด', 'เจษ', 'บอส', 'บูม'], reward: 'โบนัสเต็ม ⭐' },
      { title: '⏰ ขยันทำ OT', color: '#d97706', bg: '#fef3c7', winners: ['🥇 เชอร์รี่ 304ชม.', '🥈 โอเว่น 200ชม.', '🥉 ก็อต 136ชม.'], reward: 'ทุ่มเท 💪' },
      { title: '💰 ทีมยอดขายสูงสุด', color: '#7c3aed', bg: '#ede9fe', winners: ['🥇 เกมส์ 17.65M', '🥈 วุฒิ 8.37M', '🥉 โอเว่น 1.78M'], reward: 'รวม 27.79M 🎉' }
    ];
    return (
      <div style={{height:'100%',background:'linear-gradient(to bottom right,#1e1b4b,#312e81)',padding:12,overflow:'auto'}}>
        <h2 style={{fontSize:18,fontWeight:'bold',color:'white',marginBottom:10,textAlign:'center'}}>🎖️ รางวัลพนักงานดีเด่น</h2>
        {awards.map((a, i) => (
          <div key={i} style={{background:a.bg,borderRadius:8,padding:8,marginBottom:8,borderLeft:`4px solid ${a.color}`}}>
            <p style={{fontSize:12,fontWeight:'bold',color:a.color,margin:'0 0 4px'}}>{a.title}</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:4}}>{a.winners.map((w, j) => <span key={j} style={{background:a.color,color:'white',padding:'3px 8px',borderRadius:10,fontSize:10}}>{w}</span>)}</div>
          </div>
        ))}
        <div style={{background:'linear-gradient(to right,#fbbf24,#f59e0b)',borderRadius:8,padding:10,marginBottom:8}}>
          <p style={{fontSize:12,fontWeight:'bold',color:'white',margin:'0 0 4px'}}>🌟 KPI 0.1% กำไร</p>
          <p style={{fontSize:18,fontWeight:'bold',color:'white',margin:0}}>= ฿{kpiBonus.toLocaleString(undefined,{maximumFractionDigits:2})}</p>
        </div>
        <div style={{background:'linear-gradient(to right,#ec4899,#be185d)',borderRadius:8,padding:10,marginBottom:8}}>
          <p style={{fontSize:12,fontWeight:'bold',color:'white',margin:'0 0 4px'}}>💎 ความตั้งใจ มุ่งมานะ</p>
          <div style={{background:'white',padding:8,borderRadius:6,display:'flex',alignItems:'center',gap:8}}>
            <span style={{fontSize:20}}>🏅</span>
            <div><p style={{fontWeight:'bold',color:'#be185d',margin:0}}>เบนซ์</p><p style={{fontSize:9,color