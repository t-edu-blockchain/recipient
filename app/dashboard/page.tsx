'use client';
import React, { useState } from 'react';
import { Button, Modal, QRCode, Card, Typography, Row, Col, Input } from 'antd';

const { Title, Text } = Typography;
const { Search } = Input;

// Define types for certificate data
interface Certificate {
  certificateId: string;
  studentName: string;
  course: string;
  issueDate: string;
  validity: string;
}

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Demo data for multiple certificates
  const certificates: Certificate[] = [
    {
      certificateId: '123456',
      studentName: 'John Doe',
      course: 'React Development',
      issueDate: 'March 2025',
      validity: 'Lifetime',
    },
    {
      certificateId: '789012',
      studentName: 'Emily Johnson',
      course: 'Full Stack Web Development',
      issueDate: 'January 2025',
      validity: 'Lifetime',
    },
    {
      certificateId: '345678',
      studentName: 'Michael Brown',
      course: 'Data Science',
      issueDate: 'July 2024',
      validity: '1 Year',
    },
    {
      certificateId: '901234',
      studentName: 'Sophia Lee',
      course: 'UI/UX Design',
      issueDate: 'December 2024',
      validity: 'Lifetime',
    },
  ];

  // Filter certificates based on the search query
  const filteredCertificates = certificates.filter(
    (certificate) =>
      certificate.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      certificate.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      certificate.certificateId.includes(searchQuery)
  );

  const showModal = (certificate: Certificate): void => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const handleOk = (): void => {
    setIsModalOpen(false);
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Student Dashboard</Title>

      {/* Search Input */}
      <Search
        placeholder="Search by Student Name, Course, or Certificate ID"
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '20px', width: '100%' }}
      />

      <Row gutter={[16, 16]}>
        {filteredCertificates.map((certificate) => (
          <Col key={certificate.certificateId} span={8}>
            <Card>
              <Title level={4}>Certificate Information</Title>
              <p><strong>Certificate ID:</strong> {certificate.certificateId}</p>
              <p><strong>Student Name:</strong> {certificate.studentName}</p>
              <p><strong>Course:</strong> {certificate.course}</p>
              <p><strong>Issue Date:</strong> {certificate.issueDate}</p>
              <p><strong>Validity:</strong> {certificate.validity}</p>
              <Button type="primary" onClick={() => showModal(certificate)}>
                Share
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedCertificate && (
        <Modal
          title="Share Certificate"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Close
            </Button>
          ]}
        >
          <QRCode value={`https://example.com/certificate/${selectedCertificate.certificateId}`} />
          <Text>Scan this QR code to view or share your certificate.</Text>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
