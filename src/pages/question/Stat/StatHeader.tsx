import React, { FC, useMemo } from 'react'
import { Space, Button, Typography, Tooltip, message, Popover } from 'antd'
import copy from 'copy-to-clipboard'
import QRCode from 'qrcode.react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './StatHeader.module.scss'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'

const { Title } = Typography
const StatHeader: FC = () => {
  const { id } = useParams()
  const nav = useNavigate()
  const { title, isPublished } = useGetPageInfo()
  const url = `http://Localhost:3000/question/${id}`
  //复制链接
  function copyLink() {
    copy(url)
    message.success('复制成功')
  }

  function genLinkAndQRCode() {
    if (!isPublished) return null
    const QRCodeEle = <QRCode value={url} size={100}></QRCode>
    return (
      <Space align="center">
        <Tooltip title="问卷分享链接">
          <Button onClick={copyLink}>{url}</Button>
        </Tooltip>
        <Tooltip title="复制链接">
          <Button icon={<CopyOutlined />} onClick={copyLink}></Button>
        </Tooltip>
        <Popover content={QRCodeEle}>
          <Button icon={<QrcodeOutlined></QrcodeOutlined>}></Button>
        </Popover>
      </Space>
    )
  }

  //性能优化：使用useMemo缓存第三方QR（useMemo使用场景：依赖项不经常变化+生成元素的成本较高）
  const LinkAndQRcodeEle = useMemo(genLinkAndQRCode, [isPublished, url])

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button icon={<LeftOutlined />} type="link" onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{LinkAndQRcodeEle}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StatHeader
