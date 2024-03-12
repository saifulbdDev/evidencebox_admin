/* eslint-disable react-hooks/exhaustive-deps */
'use client'; // This is a client component
import React, { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import PlanCard from '@/components/user/PlanCard';
import { useGetPlansQuery } from '@/features/user/userApi';
import Swal from 'sweetalert2';
import { Plan } from '@/types/user';
import { DebouncedInput } from '@/components/ui/DebouncedInput';
import { breadcrumbs } from '@/utils/data/breadcrumbs';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { Loader } from '@/assets/icons';
import Button from '@/components/ui/Buttons/Button';
import AddPlan from '@/components/user/AddPlan';
import DeleteModal from '@/components/ui/Modals/DeleteModal';
import UpdatePlan from '@/components/user/UpdatePlan';
import { useSelector } from 'react-redux';
import { userState } from '@/types/user';
import { useDeletePlanMutation } from '@/features/user/userApi';
const Plans: React.FC = () => {
  const { isLoading } = useGetPlansQuery('');
  const [search, setSearch] = useState<string>('');
  const [deletePlan, { isLoading: isDelete, isSuccess, error, isError }] = useDeletePlanMutation();
  const { plans } = useSelector((state: userState) => state.user);
  const [filterPlans, setFilterPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan>({});
  const [isAddPlan, setAddPlan] = useState<boolean>(false);
  const [isEditPlan, setIsEditPlan] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const onDelatePlan = async () => {
    try {
      //@ts-ignore

      const response = await deletePlan(selectedPlan);

      if ('error' in response) {
        // Handling error
        Swal.fire({
          title: 'Ops Something went wrong',
          //@ts-ignore
          text: response?.error?.data?.message,
          icon: 'error',
        });
      } else if (response.data.status === 'success') {
        // Success message
        Swal.fire({
          title: 'Success',
          text: response.data.message,
          icon: 'success',
        });
        setIsDeleteModalOpen(false);
      }
    } catch (err) {
      // Handle error
    }
  };

  useEffect(() => {
    const filteredData = plans.filter((plan: Plan) => {
      //if no input the return the original
      if (search === '') {
        return plan;
      }
      //return the item which contains the user input
      else {
        const { title, currency, price, packageType, intervalCount, offer, description } = plan;
        const normalizedSearchTerm = search.toUpperCase();
        return (
          title?.toUpperCase().includes(normalizedSearchTerm) ||
          currency?.toUpperCase().includes(normalizedSearchTerm) ||
          packageType?.toUpperCase().includes(normalizedSearchTerm) ||
          intervalCount === Number(search) || // Check if intervalCount matches the search term (assuming search term is a number)
          offer?.toUpperCase().includes(normalizedSearchTerm) ||
          price === Number(search) || // Check if price matches the search term (assuming search term is a number)
          description?.toUpperCase().includes(normalizedSearchTerm)
        );
      }
    });

    setFilterPlans(filteredData);
  }, [search, plans]);
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl mb-1">Plans</h2>
        <Breadcrumbs pages={breadcrumbs.plans.lists} />
      </div>
      <div className="mb-5 bg-white flex justify-between items-center px-3 py-3 rounded-lg shadow-amber-100">
        <DebouncedInput
          value={search ?? ''}
          onChange={(value: string) => setSearch(String(value))}
          placeholder={'Search'}
        />
        <div>
          <Button
            onClick={() => setAddPlan(true)}
            className="px-3 py-2 h-fit items-center rounded-lg flex"
          >
            <PlusIcon className="h-6 w-6 text-white  hover:text-primary-400" /> Add Plan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 lg:gap-6">
        {isLoading && !plans.length ? (
          <div className="bg-white shadow-amber-50 col-span-3 min-h-screen flex items-center">
            <Loader className="stroke-primary-400 mx-auto text-primary-400 text-center mx" />
          </div>
        ) : filterPlans?.length ? (
          filterPlans?.map((plan) => (
            <PlanCard
              className=""
              onEdit={() => {
                setSelectedPlan(plan);
                setIsEditPlan(true);
              }}
              onDelete={() => {
                setSelectedPlan(plan);
                setIsDeleteModalOpen(true);
              }}
              plan={plan}
              key={plan?.id}
            />
          ))
        ) : (
          <div className='col-span-3 text-center min-h-screen flex items-center justify-center'>No matching records found!</div>
        )}
      </div>
      <AddPlan open={isAddPlan} onClose={() => setAddPlan(false)} />
      <UpdatePlan plan={selectedPlan} open={isEditPlan} onClose={() => setIsEditPlan(false)} />
      <DeleteModal
        title="Delete Plan"
        text="Your plan will be deleted permanently. Are you sure you want to continue?"
        open={isDeleteModalOpen}
        isDelete={isDelete}
        onConfirm={onDelatePlan}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default Plans;
