import React, { useState, useEffect } from 'react'
import 'antd/dist/reset.css'
import "./App.css"
import moment from 'moment';
import {
  Table, Button,
  Tag,
  DatePicker,
  Form,
  Input,
  Select,
  Modal,
  Popconfirm,
  Space,
  
} from 'antd';
import { AiOutlineEdit } from 'react-icons/ai';



function App() {
  const [searchState, setsearchState] = useState("")
  const [TagsOption, setTagsOption] = useState(["work", "school"])
  const [statusoption, setstatusoption] = useState(["Done", "Assigned"])
  const [ID, setID] = useState(2);
  const [TimeStamp, setTimeStamp] = useState(null)
  const [Title, setTitle] = useState("")
  const [Description, setdescription] = useState("")
  const [Due_date, setDue_date] = useState(null)
  const [Tags, setTags] = useState()
  const [Status, setStatus] = useState();

  const [editRowKey, seteditRowKey] = useState(null)
  const [changes] = Form.useForm();


  const [isModalOpen, setIsModalOpen] = useState(false);
  const { TextArea } = Input;



  const [form] = Form.useForm();

  const colums = [
    {
      key: "0",
      title: "ID",
      dataIndex: "id",
      sorter:(record1, record2)=>{
        return record1.id>record2.id
      }
    },
    {
      key: "1",
      title: "TimeStamp",
      dataIndex: 'timestamp',
      sorter:(record1, record2)=>{
        return record1.id>record2.id
      }
    },
    {
      key: "2",
      title: "Title",
      dataIndex: 'title',
      sorter:(record1, record2)=>{
        return record1.id>record2.id
      },
      filteredValue:[searchState],
      onFilter:(value,record)=>{
          return( 
            String(record.title).toLowerCase().
            includes(value.toLowerCase()) ||
            String(record.description).toLowerCase().
            includes(value.toLowerCase())  ||
            String(record.timestamp).toLowerCase().
            includes(value.toLowerCase()) ||
            String(record.status).toLowerCase().
            includes(value.toLowerCase())  ||
            String(record.tag).toLowerCase().
            includes(value.toLowerCase())
          )
      },
      render: (text, record) => {
        if (editRowKey === record.key) {
          return (
            <Form.Item name="title"
              rules={[
                {
                  required: true,
                  message: "Please enter Title"
                }
              ]}>
              <Input />
            </Form.Item>);
        }
        else {
          return <p>{text}</p>
        }
      }
    },
    {
      key: "3",
      title: "Description",
      dataIndex: 'description',
      render: (text, record) => {
        if (editRowKey === record.key) {
          return (
            <Form.Item name="description"
              rules={[
                {
                  required: true,
                  message: "Please enter Description"
                }
              ]}>
              <Input />
            </Form.Item>);
        }
        else {
          return <p>{text}</p>
        }
      }
    },
    {
      key: "4",
      title: "Due Date",
      dataIndex: "due_date",
      sorter:(record1, record2)=>{
        return record1.id>record2.id
      },
      render: (text, record) => {
        if (editRowKey === record.key) {
          return (
            <Form.Item name="due_date"
              rules={[
                {
                  required: true,
                  message: "Please Select date"
                }
              ]}>
              <DatePicker style={{width:"120px"}}/>
            </Form.Item>);
        }
        else {
          return <p>{text}</p>
        }
      }
    },
    {
      key: "5",
      title: "Tags",
      dataIndex: 'tag',
      render: (text, record) => {
        if (editRowKey === record.key) {
          return (
              <Form.Item name="tag" label="Tags">
                <Select mode="multiple" style={{ width: "130px" }} defaultValue={[text]} placeholder="Select tags">
                  {
                    TagsOption.map((val, index) => (
                      <Select.Option key={index} value={val}>{val}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            );
        }
        else {
          if (record.tag !== undefined && Object.keys(record.tag).length !== 0) {
            // console.log(record);
            const tags = record.tag;
            return (
              tags.map((values, index) => (
                <Tag key={index} color='purple'>{values}</Tag>
              ))
            )
          }
          else {
            null
          }
        }
      }
    },
    {
      key: "6",
      title: "Status",
      dataIndex: 'status',
      render: (_, record) => {
        if (editRowKey === record.key) {
          // console.log("enter");
          return (
            <Form.Item name="status"
              rules={[
                {
                  required: true,
                  message: "Please enter Status"
                }
              ]}>
              <Form.Item name="status" label="Status">
                <Select style={{ width: "110px" }}>
                  {
                    statusoption.map((vals, index) => (
                      <Select.Option key={index} value={vals}>{vals}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>

            </Form.Item>);
        } else {
          if (record !== null) {
            var value = ""
            // console.log((record));
            if (record.status === undefined) {
              value = "Assigned"
            } else {
              value = String(record.status);
            }
            if (value.length > 6) {
              return (
                <p style={{ color: "red" }}>{value}</p>
              )
            }
            else {
              return (
                <p style={{ color: "green" }}>{value}</p>
              )
            }
          }
        }
      },
      
    },
    {
      key: "7",
      title: "Actions",
      render: (_, record) => {
        // console.log(record);
        return (
          dataset.length > 0 ? (
            <Space>
              <Popconfirm
                title="Are you sure want to delete?"
                onConfirm={() => { deleteStudent(record) }}
              >

                <Button danger type='primary'>
                  Delete
                </Button>
              </Popconfirm>

              <Button onClick={() => {
                // console.log(record);
                seteditRowKey(record.key);
                changes.setFieldsValue({
                  title: record.title,
                  description: record.description,
                  // due_date: record.due_date
                  tag: record.tag,
                  status: record.status
                })
              }}>
                <AiOutlineEdit size={"14px"} />
              </Button>
              <Button type='primary' ghost htmlType='submit'>
                save
              </Button>
            </Space>
          ) : null
        )
      }
    }
  ]

  const [dataset, setdataset] = useState(
    [
      {
        key: "1",
        id: "1",
        title: "harsh",
        description: "aaya ",
        due_date:"17/04/2023",
        timestamp: "12:34:99 am",
        tag: ["work","Home"],
        status: "Done"
      },
      {
        key: "2",
        id: "2",
        title: "manish",
        description: "gaya",
        due_date:"17/05/2023",
        timestamp: "12:34:99 am",
        tag: ["work","Home"],
        status: "Assigned"
      }
    ])

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (TimeStamp !== null) {
      AddNewTask();
    }
  }, [TimeStamp]);

  const Task_to_State = (values) => {
    // console.log(values);
    const dates = String(values.due_date.$d);
    const myarr = dates.split(" ");
    const month = String(values.due_date.$M + 1);
    const date = [myarr[2], month, myarr[3]]

    setID(pre => pre + 1);
    setTimeStamp(moment().format('hh:mm:ss a'));
    setTitle(values.title);
    setdescription(values.description);
    setDue_date(date.join('/'))
    if(values.tag.length + TagsOption.length > TagsOption.length){
      const val = TagsOption.concat(values.tag);
      console.log("this is tags option",val);
      setTagsOption(val);
    }
    setTags(values.tag)
    setStatus(values.status)
    // console.log("task to state called", TimeStamp);
  }

  const AddNewTask = () => {
    // console.log("Add new task called");
    const newTask = {
      key: ID,
      id: ID,
      timestamp: TimeStamp,
      title: Title,
      description: Description,
      due_date: Due_date,
      tag: Tags,
      status: Status
    }
    setdataset((pre) => [...pre, newTask]);
  }

  const deleteStudent = (record) => {
    setdataset((pre) => {
      return pre.filter(student => student.id !== record.id);
    })
  }

  const resetdata = () => {
    form.resetFields();
  }

  const onFinish = (values) => {
    // console.log(values);
    const dates = String(values.due_date.$d);
    const myarr = dates.split(" ");
    const month = String(values.due_date.$M + 1);
    const date = [myarr[2], month, myarr[3]]
    const due_date = date.join('/')

    var index = dataset.findIndex((element) => element.key === editRowKey);
    var datapreview = dataset.find((element) => element.key === editRowKey);
    // console.log(index);

    const updatedDataSource = [...dataset];
    updatedDataSource.splice(index, 1, { ...values, id: editRowKey, key: editRowKey, due_date: due_date, timestamp: datapreview.timestamp });
    setdataset(updatedDataSource);

    seteditRowKey(null);
  };

  return (
    <div className='App'>
      <div className="App-header" style={{display:"flex",alignItems:"center", flexDirection:"column"}}>
        
        <Button type='primary' onClick={() => { showModal() }} style={{marginBottom: 8, margin:"5px", width:"180px"}}>Add a Task  </Button>
        <Input.Search 
        onSearch={(value)=>{
          setsearchState(value)
        }}
        onChange={(e)=>{
          setsearchState(e.target.value);
        }}
        placeholder='Search here ....'
        style={{marginBottom: 8, margin:"5px", width:"300px"}} 
        />

        <Form form={changes} onFinish={onFinish}>
          <Table
            columns={colums}
            dataSource={dataset} 
            >
          </Table>
        </Form>
      </div>
      <Modal title="Add Task" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          form={form}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          style={{
            maxWidth: 600,
          }}
          onFinish={Task_to_State}
        >
          <Form.Item name="title" label="Title"
            rules={[
              {
                required: true,
                message: "Please enter Title"
              }
            ]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[
            {
              required: true,
              message: "Please enter Description"
            }
          ]}>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="due_date" label="Due Date"
            rules={[
              {
                required: true,
                message: "Please Select Due Date"
              }
            ]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="tag" label="Tags">
            <Select mode='tags'>
              {
                TagsOption.map((vals, index) => (
                  <Select.Option key={index} value={vals}>{vals}</Select.Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Select>
              {
                statusoption.map((vals, index) => (
                  <Select.Option key={index} value={vals}>{vals}</Select.Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' type='primary' onClick={() => {
              setTimeout(() => {
                resetdata();
                setTimeStamp(null);
                setStatus([]);
                setTags([]);
              }, 1000);
            }}>Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default App
