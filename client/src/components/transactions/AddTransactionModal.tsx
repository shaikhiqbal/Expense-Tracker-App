import { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { addTransaction } from '../../features/transactions/transactionsSlice';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface AddTransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddTransactionModal = ({ open, onOpenChange }: AddTransactionModalProps) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    type: '' as 'income' | 'expense' | '',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.type && formData.amount && formData.category) {
      dispatch(addTransaction({
        type: formData.type,
        amount: Number(formData.amount),
        category: formData.category,
        description: formData.description,
        date: new Date(formData.date).toISOString()
      }));
      setFormData({ type: '', amount: '', category: '', description: '', date: new Date().toISOString().split('T')[0] });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
            Add New Transaction
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select value={formData.type || 'none'} onValueChange={(value) => setFormData({...formData, type: value === 'none' ? '' : value as 'income' | 'expense'})}>
              <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-xl">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Select type</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-xl"
              required
            />

            <Input
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-xl"
              required
            />

            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-xl"
              required
            />
          </div>

          <Input
            placeholder="Description (optional)"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-xl"
          />

          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1 border-gray-300 dark:border-gray-600 rounded-xl"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >
              Add Transaction
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};