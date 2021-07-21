import { Button, Table } from 'antd';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { PaperManage } from '@/services/examManage';

export default function Paper() {
  const [page, setPage] = useState({
    current: 1,
    pages: 1,
    size: 10,
    total: 1,
  });
  const [paperList, setPaperList] = useState<API.PaperManagePaging>();
  const queryXExamList = async (current = page.current, size = page.size) => {
    try {
      const currentExamList = await PaperManage({
        data: {
          current: current,
          size: size,
          params: {
            title: '',
          },
          t: moment().unix(),
        },
      });
      setPage({
        current: currentExamList.data.current,
        pages: currentExamList.data.pages,
        size: currentExamList.data.size,
        total: currentExamList.data.total,
      });
      setPaperList(currentExamList.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    queryXExamList();
  }, []);

  const columns = [
    /* catId: string;
    catId_dictText: string;
    createBy: string;
    createBy_dictText: string;
    createTime: string;
    deptCode: string;
    id: string;
    joinType: number;
    joinType_dictText: string;
    objScore: number;
    quCount: number;
    subjScore: number;
    timeType: number;
    title: string;
    totalScore: number; */
    {
      title: '试卷名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '全部分类',
      dataIndex: 'catId_dictText',
      key: 'catId_dictText',
    },
    {
      title: '组卷方式',
      dataIndex: 'joinType_dictText',
      key: 'joinType_dictText',
    },
    {
      title: '总分',
      dataIndex: 'totalScore',
      key: 'totalScore',
    },
    {
      title: '创建人',
      dataIndex: 'createBy_dictText',
      key: 'createBy_dictText',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
  ];

  return (
    <div>
      {paperList && (
        <Table
          columns={columns}
          dataSource={paperList.records}
          pagination={{ defaultCurrent: page.current, total: page.total }}
        />
      )}
    </div>
  );
}
