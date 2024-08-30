import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function AdminjobsTable({ jobs }) {
    const navigate = useNavigate();

    return (
        <div>
            <Table>
                <TableCaption>A List of your recent Posted Jobs.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        jobs?.length <= 0 ? (<span>You haven't registered any company yet.!</span>) : (
                            <>
                                {
                                    jobs?.map((job, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{job?.company?.name}</TableCell>
                                                <TableCell>{job?.title}</TableCell>
                                                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                                <TableCell className="text-right cursor-pointer">
                                                    <Popover>
                                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                                        <PopoverContent className="w-32">
                                                            <div className='flex flex-col gap-2 justify-center'>
                                                                <div className='flex items-center gap-2 w-fit cursor-pointer'>
                                                                    <Edit2 className='w-4' />
                                                                    <span>Edit</span>
                                                                </div>
                                                                <div onClick={() => navigate(`/admin/job/${job?._id}/applicants`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                                    <Eye className='w-4' />
                                                                    <span>Applicants</span>
                                                                </div>
                                                            </div>

                                                        </PopoverContent>
                                                    </Popover>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </>
                        )
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default AdminjobsTable