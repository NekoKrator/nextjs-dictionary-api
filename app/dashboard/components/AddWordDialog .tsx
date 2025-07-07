'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function AddWordDialog() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus />
              Add
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new word</DialogTitle>
            </DialogHeader>
            <div>
              <div>
                <Label htmlFor='word'>Word</Label>
                <Input id='word' placeholder='Enter word' />
              </div>
              <div>
                <Label htmlFor='translation'>translation</Label>
                <Input id='translation' placeholder='Enter translation' />
              </div>
              <div>
                <Label htmlFor='example'>Example of usage (optional)</Label>
                <Input id='example' placeholder='Enter example' />
              </div>
              <Button>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
