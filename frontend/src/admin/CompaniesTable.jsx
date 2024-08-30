import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit2, MoreHorizontal } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function CompaniesTable({companies}) {
    const navigate = useNavigate();

    return (
        <div>
            <Table>
                <TableCaption>A List of your recent registered Companies.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        companies?.length <= 0 ? (<span>You haven't registered any company yet.!</span>) : (
                            <>
                                {
                                    companies?.map((company, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Avatar>
                                                        <AvatarImage src={company?.logo || "https://app.ejamjobs.com/assets/admin/img/default_company_logo.png"} />
                                                    </Avatar>
                                                </TableCell>
                                                <TableCell>{company?.name}</TableCell>
                                                <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
                                                <TableCell className="text-right cursor-pointer">
                                                    <Popover>
                                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                                        <PopoverContent className="w-32">
                                                            <div onClick={()=> navigate(`/admin/companysetup/${company?._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                                <Edit2 className='w-4' />
                                                                <span>Edit</span>
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

export default CompaniesTable