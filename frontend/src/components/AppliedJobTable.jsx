import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { useSelector } from 'react-redux';
import store from '@/redux/store';

function AppliedJobTable() {
    useGetAppliedJobs();

    const { allAppliedJobs } = useSelector(store => store.jobs);
  return (
    <div>
        <Table>
            <TableCaption>A List of Applied Jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    allAppliedJobs?.map((application, index)=>(
                        <TableRow key={index}>
                            <TableCell>{application?.createdAt.split("T")[0]}</TableCell>
                            <TableCell>{application?.job?.title}</TableCell>
                            <TableCell>{application?.job?.company?.name}</TableCell>
                            <TableCell className="text-right">
                                    {
                                        application?.status === "pending" ? <Badge className="bg-gray-600">Pending</Badge> :
                                        application?.status === "accepted" ? <Badge className="bg-green-800">Accepted</Badge> :
                                        application?.status === "rejected" ? <Badge className="bg-red-800">Rejected</Badge> :
                                        <Badge color="gray">NA</Badge>
                                    }
                                </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default AppliedJobTable